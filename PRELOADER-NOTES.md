# PV.SYSTEM preloader

Novo preloader de inicialização do portfólio.

## Stack usada
- React Three Fiber / Three.js: campo 3D de zeros e uns.
- Framer Motion: entrada das linhas, progresso e transição final.
- Nenhuma dependência nova foi adicionada.

## Sequência visual
1. PV.SYSTEM INIT
2. verificando ambiente...
3. sincronizando interface...
4. compilando presença digital...
5. acesso concedido.

## Arquivos principais
- `components/preloader/system-preloader.tsx`
- `components/preloader/binary-field.tsx`
- `app/page.tsx`

Se depois quiser uma versão com GSAP, a timeline pode substituir apenas a coordenação temporal; o campo 3D pode permanecer igual.
