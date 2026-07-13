# Snake neon controlado pelo mouse — executado no navegador via Pyodide.
import math
import random
from js import window, document

SEG_SPACING = 13.0
INIT_LEN = 14
GROW_PER_FOOD = 3
ABSORB_RADIUS = 26.0
MAGNET_RADIUS = 90.0
MAX_PARTICLES = 16

state = {
    "segments": [],
    "particles": [],
    "sparks": [],
    "score": 0,
    "w": 0.0,
    "h": 0.0,
}


def _rand_particle(w, h):
    margin = 40
    return {
        "x": random.uniform(margin, w - margin),
        "y": random.uniform(margin, h - margin),
        "r": random.uniform(3.0, 5.5),
        "phase": random.uniform(0, math.tau),
        "hue": random.choice([265, 258, 272]),
    }


def init():
    cfg = window.__snakeState
    w = float(cfg.w)
    h = float(cfg.h)
    state["w"] = w
    state["h"] = h
    state["segments"] = [[w / 2, h / 2] for _ in range(INIT_LEN)]
    state["particles"] = [_rand_particle(w, h) for _ in range(MAX_PARTICLES)]
    state["sparks"] = []
    state["score"] = 0


def _spawn_sparks(x, y, n=14):
    for _ in range(n):
        ang = random.uniform(0, math.tau)
        spd = random.uniform(1.0, 4.0)
        state["sparks"].append({
            "x": x, "y": y,
            "vx": math.cos(ang) * spd,
            "vy": math.sin(ang) * spd,
            "life": 1.0,
        })


def tick():
    cfg = window.__snakeState
    canvas = document.getElementById("snake-canvas")
    if canvas is None:
        return state["score"]
    ctx = canvas.getContext("2d")

    w = float(cfg.w)
    h = float(cfg.h)
    if w != state["w"] or h != state["h"] or not state["segments"]:
        state["w"] = w
        state["h"] = h
        if not state["segments"]:
            init()

    mx = float(cfg.mx)
    my = float(cfg.my)
    segs = state["segments"]

    # cabeça segue o mouse suavemente
    head = segs[0]
    head[0] += (mx - head[0]) * 0.22
    head[1] += (my - head[1]) * 0.22

    # corpo segue mantendo o espaçamento
    for i in range(1, len(segs)):
        prev = segs[i - 1]
        cur = segs[i]
        dx = prev[0] - cur[0]
        dy = prev[1] - cur[1]
        dist = math.hypot(dx, dy) or 0.0001
        if dist > SEG_SPACING:
            t = (dist - SEG_SPACING) / dist
            cur[0] += dx * t
            cur[1] += dy * t

    # partículas: magnetismo + absorção
    grew = False
    for p in state["particles"]:
        dx = head[0] - p["x"]
        dy = head[1] - p["y"]
        d = math.hypot(dx, dy) or 0.0001
        if d < MAGNET_RADIUS:
            pull = (1 - d / MAGNET_RADIUS) * 0.18
            p["x"] += dx * pull
            p["y"] += dy * pull
        if d < ABSORB_RADIUS:
            state["score"] += 1
            grew = True
            _spawn_sparks(p["x"], p["y"])
            np = _rand_particle(w, h)
            p.update(np)

    if grew:
        tail = segs[-1]
        for _ in range(GROW_PER_FOOD):
            segs.append([tail[0], tail[1]])

    # ---------- desenho ----------
    ctx.clearRect(0, 0, w, h)

    # rastro do corpo (linha neon)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.shadowBlur = 18
    ctx.shadowColor = "rgba(139,92,246,0.9)"
    ctx.strokeStyle = "rgba(167,139,250,0.85)"
    ctx.lineWidth = 9
    ctx.beginPath()
    ctx.moveTo(segs[0][0], segs[0][1])
    for s in segs[1:]:
        ctx.lineTo(s[0], s[1])
    ctx.stroke()

    # núcleos brilhantes dos segmentos
    n = len(segs)
    for i in range(n - 1, -1, -1):
        s = segs[i]
        f = 1 - (i / max(n, 1))
        r = 3 + f * 4
        ctx.shadowBlur = 16
        ctx.shadowColor = "rgba(196,181,253,0.9)"
        ctx.fillStyle = "rgba(196,181,253," + str(round(0.25 + f * 0.6, 3)) + ")"
        ctx.beginPath()
        ctx.arc(s[0], s[1], r, 0, math.tau)
        ctx.fill()

    # cabeça
    ctx.shadowBlur = 28
    ctx.shadowColor = "rgba(167,139,250,1)"
    ctx.fillStyle = "#e9e3ff"
    ctx.beginPath()
    ctx.arc(head[0], head[1], 9, 0, math.tau)
    ctx.fill()

    # partículas alvo
    t = window.performance.now() / 600.0
    for p in state["particles"]:
        pr = p["r"] + math.sin(t + p["phase"]) * 1.2
        ctx.shadowBlur = 20
        ctx.shadowColor = "rgba(167,139,250,0.9)"
        ctx.fillStyle = "rgba(216,205,255,0.95)"
        ctx.beginPath()
        ctx.arc(p["x"], p["y"], pr, 0, math.tau)
        ctx.fill()

    # faíscas de absorção
    alive = []
    ctx.shadowBlur = 12
    ctx.shadowColor = "rgba(167,139,250,0.8)"
    for sp in state["sparks"]:
        sp["x"] += sp["vx"]
        sp["y"] += sp["vy"]
        sp["vx"] *= 0.92
        sp["vy"] *= 0.92
        sp["life"] -= 0.04
        if sp["life"] > 0:
            ctx.fillStyle = "rgba(196,181,253," + str(round(sp["life"], 3)) + ")"
            ctx.beginPath()
            ctx.arc(sp["x"], sp["y"], 2.2 * sp["life"] + 0.5, 0, math.tau)
            ctx.fill()
            alive.append(sp)
    state["sparks"] = alive

    ctx.shadowBlur = 0
    return state["score"]
