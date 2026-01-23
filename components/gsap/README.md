# Novos Componentes GSAP Premium

Dois novos componentes de animação foram adicionados ao projeto SEEA:

## 1. HorizontalScrollText

Texto que rola horizontalmente com animação de caracteres individuais.

### Como usar:

```tsx
import HorizontalScrollText from '@/components/gsap/HorizontalScrollText'

<HorizontalScrollText 
  text="SEEA • VISÃO CINEMATOGRÁFICA • DESIGN • MOTION • FUTURO •"
  className="bg-gradient-to-r from-purple-900 to-black"
/>
```

### Propriedades:
- `text` (string, required): O texto a ser exibido
- `className` (string, optional): Classes CSS adicionais

### Características:
- Scroll horizontal pinado de 5000px
- Cada caractere anima independentemente
- Movimento vertical aleatório dos caracteres ao entrarem
- Usa `containerAnimation` do ScrollTrigger

---

## 2. SplitTextReveal

Texto que se revela linha por linha com animação suave.

### Como usar:

```tsx
import SplitTextReveal from '@/components/gsap/SplitTextReveal'

<SplitTextReveal 
  text="A SEEA Mídia transforma marcas em experiências visuais inesquecíveis"
  className="text-white"
  duration={0.8}
  stagger={0.15}
/>
```

### Propriedades:
- `text` (string, required): O texto a ser revelado
- `className` (string, optional): Classes CSS adicionais
- `duration` (number, optional): Duração da animação de cada linha (padrão: 0.6s)
- `stagger` (number, optional): Delay entre linhas (padrão: 0.1s)

### Características:
- Divide automaticamente em linhas baseado no layout
- Animação de baixo para cima com fade
- Botão "Replay Slowly" incluído
- Espera fontes carregarem antes de animar

---

## Página Demo

Acesse **http://localhost:3000/gsap-demo** para ver ambas animações em ação.

---

## Implementação Técnica

Ambos os componentes foram criados **sem** o plugin `SplitText` premium do GSAP, usando:
- Split manual de texto em caracteres/palavras
- DOM manipulation nativa
- GSAP básico + ScrollTrigger

Isso garante que funcionem com a versão gratuita do GSAP que já está instalada.

---

## Onde Usar no Site

### HorizontalScrollText
- Seção de manifesto/visão
- Destaque de serviços
- Lista de clients/projetos

### SplitTextReveal  
- Seção "Visão além do agora" ✅
- Call-to-actions importantes
- Títulos de seções grandes
- Mensagens de impacto

---

## Performance

✅ **Otimizado** - Usa `will-change` e GPU acceleration
✅ **Clean up** - Remove event listeners ao desmontar
✅ **Responsive** - Adapta ao tamanho da tela
✅ **Acessível** - Texto permanece legível mesmo sem JS
