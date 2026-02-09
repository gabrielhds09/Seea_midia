# PRD - SEEA Web

> **Produto**: SEEA Web Experience  
> **Versão**: 0.1.0  
> **Data**: 24 de Janeiro de 2026  
> **Responsável**: SEEA Mídia

---

## 1. Visão Geral do Produto

### 1.1 O que é o SEEA Web?
O **SEEA Web** é o site institucional da SEEA, uma empresa especializada em **Gestão de Carreira e Imagem** para profissionais que buscam posicionamento estratégico e autoridade digital.

### 1.2 Proposta de Valor
> *"Gestão de carreira e imagem para quem quer ir além do óbvio."*

O site comunica a essência da SEEA através de uma experiência visual premium, cinematográfica e envolvente, refletindo a qualidade e exclusividade dos serviços oferecidos.

### 1.3 Público-Alvo
- **Profissionais liberais** (advogados, médicos, dentistas, arquitetos)
- **Empreendedores** e donos de negócios
- **Influenciadores** e criadores de conteúdo
- **Executivos** que buscam posicionamento pessoal
- **Marcas** que desejam humanizar sua comunicação

---

## 2. Objetivos do Produto

### 2.1 Objetivos de Negócio
| Objetivo | Métrica de Sucesso |
|----------|-------------------|
| Gerar leads qualificados | Conversões via WhatsApp CTA |
| Comunicar autoridade | Tempo médio na página > 2 min |
| Demonstrar portfólio | Visualizações da seção de projetos |
| Construir confiança | Engajamento com depoimentos |

### 2.2 Objetivos de Experiência
- **Impressão premium** desde o primeiro acesso
- **Navegação fluida** com animações cinematográficas
- **Responsividade total** (desktop, tablet, mobile)
- **Performance otimizada** (Core Web Vitals)

---

## 3. Arquitetura Técnica

### 3.1 Stack Tecnológico

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Framework** | Next.js (App Router) | 16.1.3 |
| **Frontend** | React | 19.2.3 |
| **Estilização** | Tailwind CSS | v4 |
| **Animações** | Framer Motion | 12.26.2 |
| **Animações Avançadas** | GSAP | 3.14.2 |
| **Smooth Scroll** | Lenis | 1.0.42 |
| **Ícones** | Lucide React | 0.562.0 |
| **Tipografia** | Google Fonts (Inter) | - |

### 3.2 Estrutura de Diretórios
```
seea-web/
├── app/
│   ├── layout.tsx      # Layout raiz com metadata SEO
│   ├── page.tsx        # Página principal
│   ├── globals.css     # Estilos globais
│   └── favicon.ico
├── components/
│   ├── HeroCinematic.tsx       # Hero section cinematográfica
│   ├── ServicesDetailed.tsx    # Ecossistema SEEA (5 pilares)
│   ├── AboutSEEA.tsx           # Sobre a empresa
│   ├── TeamMinimalist.tsx      # Equipe
│   ├── ProjectTracks.tsx       # Projetos em destaque
│   ├── LoopingGallery.tsx      # Galeria de trabalhos
│   ├── TestimonialsMinimalist.tsx  # Depoimentos
│   ├── FAQMinimalist.tsx       # Perguntas frequentes
│   ├── MegaFooter.tsx          # Footer completo
│   ├── FloatingRecButton.tsx   # CTA WhatsApp flutuante
│   └── ... (29+ componentes)
├── public/
│   └── logo-seea.png
└── package.json
```

---

## 4. Funcionalidades

### 4.1 Estrutura de Seções

````carousel
### 1. Hero Cinematográfica
**Componente**: `HeroCinematic.tsx`
- Animação de entrada fluida
- Título principal com tipografia premium
- Subtítulo descritivo
- CTA: "Agendar conversa estratégica"
<!-- slide -->
### 2. Marquee de Palavras-Chave
**Componente**: `TextMarquee.tsx`
- Texto infinito em loop
- Keywords: Estratégia, Posicionamento, Autoridade, etc.
<!-- slide -->
### 3. Serviços Detalhados
**Componente**: `ServicesDetailed.tsx`
- Os 5 pilares do Ecossistema SEEA:
  1. Estratégia & Diagnóstico
  2. Branding Audiovisual
  3. Conteúdo Roteirizado
  4. Acompanhamento Presencial
  5. Gestão Estratégica (Tráfego)
<!-- slide -->
### 4. Projetos em Destaque
**Componente**: `ProjectTracks.tsx`
- Carrossel 3D com flip effect
- Showcase de trabalhos realizados
<!-- slide -->
### 5. Galeria Visual
**Componente**: `LoopingGallery.tsx`
- Grid de imagens animado
- Demonstração de qualidade visual
<!-- slide -->
### 6. Sobre a SEEA
**Componente**: `AboutSEEA.tsx`
- História da fundadora Aline Vitória
- O conceito "SEEA" (see = enxergar)
<!-- slide -->
### 7. Depoimentos
**Componente**: `TestimonialsMinimalist.tsx`
- Reviews de clientes
- Integração com Trustindex (Google Reviews)
<!-- slide -->
### 8. FAQ
**Componente**: `FAQMinimalist.tsx`
- Perguntas frequentes expandíveis
- Accordion animado
<!-- slide -->
### 9. Footer
**Componente**: `MegaFooter.tsx`
- Contato e redes sociais
- Mapa Google integrado
- Links úteis
````

### 4.2 Recursos Globais

| Recurso | Componente | Descrição |
|---------|-----------|-----------|
| **Navegação Overlay** | `OverlayNav.tsx` | Menu fullscreen animado |
| **Preloader** | `Preloader.tsx` | Loading screen inicial |
| **Smooth Scroll** | `SmoothScroll.tsx` | Scroll suave via Lenis |
| **GSAP Wrapper** | `GSAPWrapper.tsx` | ScrollTrigger global |
| **Botão Flutuante** | `FloatingRecButton.tsx` | CTA WhatsApp com ícone REC |

---

## 5. Design System

### 5.1 Paleta de Cores
```css
/* Cores Principais */
--purple-deep:    #1a0d20    /* Background principal */
--purple-dark:    #1a0525    /* Variação escura */
--purple-brand:   #7c3aed    /* Roxo vibrante da marca */
--purple-light:   #a855f7    /* Roxo claro/accent */

/* Neutros */
--white:          #ffffff
--gray-light:     #e5e7eb
--gray-dark:      #374151
```

### 5.2 Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### 5.3 Animações
- **Entrada**: Fade + Slide com Framer Motion
- **Scroll-triggered**: GSAP ScrollTrigger
- **Micro-interações**: Hover effects, scale, spring physics
- **Transições**: Curvas easeOut, durações 0.3-0.8s

---

## 6. SEO & Performance

### 6.1 Metadata Configurada
```typescript
// app/layout.tsx
title: "SEEA | Gestão de Carreira e Imagem Além do Óbvio"
description: "Estratégias audiovisuais para posicionamento e autoridade"
keywords: ["gestão de carreira", "posicionamento digital", "branding"]
```

### 6.2 Open Graph
- Imagem: `/logo-seea.png`
- Locale: `pt_BR`
- Type: `website`

### 6.3 Otimizações
- **Lazy Loading**: Componentes pesados carregam sob demanda
- **Code Splitting**: Next.js dynamic imports
- **Image Optimization**: Next.js Image component (quando aplicável)
- **Font Loading**: Google Fonts otimizado

---

## 7. Integrações

| Integração | Status | Descrição |
|------------|--------|-----------|
| **WhatsApp** | ✅ Implementado | Botão flutuante com mensagem pré-definida |
| **Google Maps** | ✅ Implementado | Iframe no footer |
| **Google Reviews** | ✅ Implementado | Widget Trustindex |
| **Google Analytics** | 🔄 A implementar | Tracking de eventos |
| **Meta Pixel** | 🔄 A implementar | Conversão de leads |

---

## 8. Tom de Voz & Copywriting

### 8.1 Diretrizes
- ✅ Humano e próximo
- ✅ Estratégico sem ser corporativo
- ✅ Direto mas respeitoso
- ✅ Autêntico e transparente

### 8.2 Evitar
- ❌ Jargões de marketing
- ❌ Promessas vazias
- ❌ Termos genéricos ("inovador", "revolucionário")
- ❌ Foco em métricas vazias (followers)

### 8.3 Palavras-Chave
> Gestão de carreira, Posicionamento, Autoridade, Rotina, Estratégia personalizada, Acompanhamento próximo, Olhar treinado, Conteúdo autêntico

---

## 9. Roadmap

### 9.1 MVP (Atual) ✅
- [x] Landing page institucional
- [x] Seções principais implementadas
- [x] Animações premium
- [x] SEO básico configurado
- [x] CTA WhatsApp funcional
- [x] Responsividade mobile

### 9.2 Fase 2 (Próximos Passos)
- [ ] Google Analytics 4 + eventos
- [ ] Meta Pixel para conversão
- [ ] Página de blog/artigos
- [ ] Sistema de agendamento integrado
- [ ] Formulário de contato

### 9.3 Fase 3 (Futuro)
- [ ] Área de clientes (login)
- [ ] Dashboard de métricas
- [ ] Integração CRM
- [ ] Multi-idioma (EN)

---

## 10. Deploy & Infraestrutura

| Item | Configuração |
|------|-------------|
| **Hosting** | Vercel (recomendado) |
| **Domínio** | seea.com.br |
| **Build** | `npm run build` |
| **Dev Server** | `npm run dev` (porta 3000) |

---

## 11. Métricas de Sucesso

### 11.1 KPIs Técnicos
- **Lighthouse Score**: > 90 em todas as categorias
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1

### 11.2 KPIs de Negócio
- **Taxa de conversão**: Visitas → WhatsApp CTA
- **Tempo na página**: > 2 minutos
- **Bounce rate**: < 40%
- **Páginas por sessão**: > 1.5

---

## 12. Contatos & Responsáveis

| Função | Responsável |
|--------|------------|
| **Fundadora** | Aline Vitória |
| **Empresa** | SEEA Mídia |
| **WhatsApp** | +55 11 99999-9999 |

---

> **Documento de Referência**: [COPYWRITING.md](file:///c:/Users/Gabriel%20H/Documents/SEEA/seea-web/COPYWRITING.md)  
> **README Técnico**: [README.md](file:///c:/Users/Gabriel%20H/Documents/SEEA/seea-web/README.md)

---

*Última atualização: 24/01/2026*
