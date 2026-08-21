# Portfólio — Paulo Vitor Brandão

Portfólio pessoal desenvolvido com Next.js, React e TypeScript para reunir meus projetos, experiência, certificações e formas de contato. A interface usa um tema espacial com cenas em Three.js/React Three Fiber e animações de interface com Motion.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion (`framer-motion`)
- Three.js
- React Three Fiber
- React Three Drei
- Vercel Analytics

## O que existe no projeto

- tema claro e escuro;
- hero com cena 3D, partículas e formas geométricas;
- cursor personalizado para dispositivos com ponteiro preciso;
- timeline da trajetória;
- certificações;
- galáxia 3D de tecnologias;
- projetos filtrados por categoria;
- formulário de contato via `mailto`;
- layout responsivo.

## Performance

As cenas 3D mantêm as animações, mas evitam atualizar buffers de partículas a cada frame quando isso não é necessário. O DPR dos canvases é limitado para reduzir o custo de renderização em telas de alta densidade. O scroll usa o comportamento nativo do navegador com `scroll-behavior: smooth`, sem interceptar eventos de roda do mouse.

As imagens usam o componente `next/image` com a otimização padrão do Next.js.

## Executando localmente

```bash
git clone https://github.com/Paulo-Vitor-dev/My-portfolio-.git
cd My-portfolio-
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estrutura principal

```text
app/
components/
  hero/
  sections/
lib/
public/
```

## Links

- Portfólio: https://paulovitorportifolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/paulovitor-dev-fullstack
- GitHub: https://github.com/Paulo-Vitor-dev
