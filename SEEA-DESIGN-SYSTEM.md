# SEEA — Design System & Brand Briefing
> Versão 1.0 · Fev/2026 · Confidencial

---

## 1. Identidade de Marca

### Proposta
> *"Gestão de carreira e imagem para quem quer ir além do óbvio."*

A SEEA enxerga o que passa despercebido. O nome vem de *see* — enxergar. O posicionamento é **ultra-luxury editorial**: distante do exagero, próximo da substância.

### Valores visuais
| Valor | Expressão |
|-------|-----------|
| **Elegância** | Espaço branco generoso, tipografia fina |
| **Autoridade** | Proporções extremas, peso e leveza contrastando |
| **Cinematográfico** | Movimento deliberado, nada apressado |
| **Autenticidade** | Sem ornamentos desnecessários |

---

## 2. Paleta de Cores

### Cores Centrais
```
Hero / Preloader (light)
  --marble-white:     #faf9f7   ← base hero
  --marble-warm:      #f7f5f2
  --marble-deep:      #f3f0ec
  --stone:            #e8e4df

Gradient Bridge (Statement Section)
  white-marble → stone → muted-stone → mauve → deep-purple → body
  #f3f0ec → #e8e4df → #c8c0be → #8a7a8a → #3d1f46 → #1a0d20

Body (dark sections)
  --body-dark:        #1a0d20   ← fundo principal
  --body-mid:         #1f1028
  --body-deep:        #050505   ← seções muito escuras

Brand
  --red:              #ed1c24   ← acento SEEA (ponto final, ícones)
  --purple-brand:     #431846   ← roxo mid (gradientes, orbs)
  --purple-deep:      #1a0d20   ← base
  --apple-glass:      rgba(255, 255, 255, 0.03) ← blur(40px)
```

### Gradientes Recorrentes
```css
/* Apresentação / preloader bar */
linear-gradient(90deg, #ed1c24, #431846)

/* Scroll indicator */
linear-gradient(180deg, #ed1c24, #431846)

/* Bridge hero → dark body */
linear-gradient(180deg,
  #f3f0ec 0%,
  #e8e4df 18%,
  #c8c0be 36%,
  #8a7a8a 52%,
  #3d1f46 70%,
  #1a0d20 100%
)

/* Horizontal rules — light sections */
linear-gradient(90deg, #d1ccc6 0%, transparent 100%)

/* Horizontal rules — dark sections */
linear-gradient(90deg, rgba(255,255,255,0.35) 0%, transparent 70%)
```

---

## 3. Tipografia

### Sistema
| Papel | Fonte | Peso | Uso |
|-------|-------|------|-----|
| **CAPS principal** | Inter / sans-serif | 100–300 (extralight) | Headlines grandes |
| **Conector** | Playfair Display / serif | 300 italic | Palavras de ligação |
| **Meta / labels** | Inter | 500 medium | Micro-texto, categorias |
| **Corpo** | Inter | 300–400 | Parágrafos |

### Escala
```
Hero headline:     clamp(2.6rem, 8.5vw, 7.5rem)  tracking: -0.04em
Statement h2:      clamp(1.8rem, 5.5vw, 4.5rem)   tracking: -0.03em
Labels / meta:     0.60rem – 0.78rem               tracking: +0.30–0.50em
Micro / caption:   0.55rem – 0.65rem               tracking: +0.40–0.55em
```

### Regra tipográfica central
> CAPS + *italic serif* alternando na mesma linha.  
> Exemplo: **UM TIME** *enxerga cada* **PROJETO** *como uma* **HISTÓRIA.**
> 
> **Implementação rigorosa:**
> A parte em itálico não deve ser esmaecida (ex: `/25`). Ela DEVE utilizar a cor densa e luxuosa de purple, usando a classe `text-[#431846]/70` em conjunto com a família `font-serif italic font-normal serif-luxury` para manter legibilidade sofisticada num fundo claro.

---

## 4. Animações & Motion

### Princípios
1. **Nada é imediato.** Toda entrada tem duração ≥ 1.2s
2. **`expo.out`** para reveals de tipografia (sensação de peso)
3. **`power3.inOut`** para linhas horizontais (expansão orgânica)
4. **Stagger** entre 0.08–0.20s (nunca tudo ao mesmo tempo)
5. **Parallax suave** no headline (yPercent –8 ao scroll)

### Timings de referência
```
Preloader total:      ~12s (logo + frases + saída)
Hero rule:            1.8s  power3.inOut
Hero headline lines:  1.8s  expo.out  stagger 0.18s
Hero meta / CTA:      1.4s  expo.out
Statement reveal:     1.6s  expo.out  stagger 0.14s
Tags:                 1.0s  power3.out stagger 0.08s
```

### Biblioteca
| Biblioteca | Função |
|---|---|
| **GSAP 3.14** | Animações de entrada + ScrollTrigger |
| **ScrollTrigger** | Animações ativas por scroll |
| **Framer Motion** | Animações de componentes React |
| **Lenis** | Smooth scroll |

---

## 5. Layout & Espaçamento

### Grid
- Margem horizontal: `px-6 → sm:px-12 → lg:px-20 → xl:px-28`
- Max-width conteúdo: `max-w-7xl` (sections) / `max-w-6xl` (statement)
- Seções principais: `py-24 → py-40`

### Regras Horizontais
Thin rules (`h-[0.5px]`) como separadores editoriais. Sempre com `origin-left` e animação `scaleX 0→1`.

### Padrão bottom-split
Meta info dividida: serviços à esquerda, localização/CTA à direita. Âncora nos edges do viewport.

---

## 6. Componentes Ativos

| Componente | Função |
|---|---|
| `Preloader` | Logo SEEA + frases + barra de loading |
| `OverlayNav` | Navegação sticky com mega-menu |
| `HeroCinematic` | Hero editorial + Statement (bridge) |
| `ContentSections` | Orquestrador de todas as seções |
| `ClientLogos` | Social proof – logos de clientes |
| `WhatWeDo` | Os 5 pilares do ecossistema SEEA |
| `DomeGallery` | Portfólio em esfera 3D interativa |
| `MethodologyTimeline` | O Método SEEA |
| `TestimonialsMinimalist` | Depoimentos |
| `AboutSEEA` | Sobre + fundadora |
| `TeamMinimalist` | Equipe |
| `MegaFooter` | Footer completo |
| `TextVideoMask` | SEEA em texto com máscara de vídeo |
| `FloatingRecButton` | CTA WhatsApp flutuante |
| `GSAPWrapper` | Inicializa ScrollTrigger globalmente |
| `SmoothScroll` | Lenis |

---

## 7. Tom de Voz

### Diretrizes  
- **Humano e próximo** — fala como um parceiro, não como uma agência
- **Estratégico sem ser frio** — direto, mas com calor
- **Nunca genérico** — sem "inovador", "revolucionário", "diferenciado"

### Palavras-chave da marca
`enxergar · olhar treinado · rotina · posicionamento · autoridade · narrativa · relevância · história · presente`

### Frases de marca
> "Um time que enxerga cada projeto como uma história."  
> "Narrativa é o destino, autoridade é a nossa jornada."  
> "Transformamos rotina em posicionamento."

---

## 8. Score do Site

| Critério | Nota | Observação |
|---|---|---|
| **Identidade visual** | 8/10 | Hero e preloader excelentes; seções escuras precisam de mais personalidade |
| **Tipografia** | 9/10 | Contraste caps/serif funcionando muito bem |
| **Animações** | 8/10 | GSAP sólido; delay 12.5s no hero é longo demais para revisitas |
| **Bridge de cores** | 7/10 | Resolvido com o gradiente; precisará de ajuste fino visual |
| **Hierarquia de conteúdo** | 8/10 | Jornada clara: hero → prova → entrega → método → time → CTA |
| **Performance** | 7/10 | 10 vídeos no public + DomeGallery pesado; lazy-load recomendado |
| **Mobile** | 6/10 | Tipografia escala bem, mas DomeGallery é denso no celular |
| **SEO** | 8/10 | Metadata, OG e robots configurados; falta GA4 e sitemap |
| **CTA / Conversão** | 7/10 | WhatsApp funcionando; falta analytics para medir |
| **Código / Manutenção** | 9/10 | Pós-limpeza: código limpo, sem dead files |

### **Score geral: 7.7 / 10 ★**

> **Para chegar a 9/10:** reduzir delay do hero para ≤ 6s, otimizar DomeGallery no mobile, adicionar GA4, implementar lazy-load nos vídeos, e refinar algumas seções escuras com mais identidade visual.
