# SEEA Web Experience

Este é o site oficial da **SEEA**, focado em **Gestão de Carreira e Imagem**. O projeto foi construído com foco em performance, animações cinematográficas e design premium.

🔗 **Posicionamento**: "Gestão de carreira e imagem para quem quer ir além do óbvio."

## 🛠 Tecnologias Utilizadas

- **Core**: [Next.js 16](https://nextjs.org/) (App Router)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.studio/)
- **Ícones**: [Lucide React](https://lucide.dev/)

## 📂 Estrutura do Projeto

Os componentes principais estão organizados em `components/`:

- **`HeroCinematic.tsx`**: A primeira dobra do site (Awwwards style), com tipografia fluida e animações de reveal.
- **`ServicesDetailed.tsx`**: O Ecossistema SEEA com os 5 pilares (Estratégia, Branding, Conteúdo, Acompanhamento, Tráfego).
- **`AboutSEEA.tsx`**: Seção "Quem Somos" com a história da fundadora.
- **`ContentSections.tsx`**: Wrapper principal que organiza a ordem das seções.
- **`ProjectTracks.tsx`**: Carrossel de projetos com efeito 3D.

## 📝 Copywriting

Toda a copy do site segue o arquivo mestre:
📄 [COPYWRITING.md](./COPYWRITING.md)

Este documento é a **Single Source of Truth** para textos, tom de voz e palavras-chave.

## 🚀 Como Rodar Localmente

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse [http://localhost:3000](http://localhost:3000).

## 📦 Deploy

O projeto está otimizado para deploy na **Vercel**:

```bash
npm run build
```

---

Desenvolvido para **SEEA Mídia**.
