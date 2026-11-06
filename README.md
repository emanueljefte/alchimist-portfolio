# Alchimist — Portfólio

Portfólio de Emanuel Jefté (Alchimist). React 19 · TypeScript · Vite · TailwindCSS 4 · GSAP.

## Correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produção → dist/
npm run lint     # tsc --noEmit
```

## Formulário de contacto

Cria um formulário em [Formspree](https://formspree.io) e define o ID em `.env.local`:

```
VITE_FORMSPREE_ID=o_teu_id
```

Sem ID, o formulário abre o cliente de email (`mailto:`).

## Conteúdo

- Projectos: `src/data/projects.data.ts` (fonte única — Home, lista e detalhe).
- Arsenal: `src/pages/TechPage.tsx`.
- Imagens em `.webp` (`src/assets/images`).
