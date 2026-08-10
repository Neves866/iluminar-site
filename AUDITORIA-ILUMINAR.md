# AUDITORIA COMPLETA — ILUMINAR

> **Data:** 07/08/2026  
> **Projeto:** iluminar-site (GitHub Pages — iluminarcvel.com.br)  
> **Tipo:** Site institucional estático multi-páginas  
> **Equipe de auditoria:** Eng. Software Sênior, Frontend Sênior, UX/UI, Mobile, Acessibilidade, SEO, Performance, Segurança

---

## 1. RESUMO EXECUTIVO

O site da Iluminar é um projeto institucional estático bem estruturado visualmente, com identidade visual forte, boa organização de páginas e conteúdo de qualidade. O design é moderno, com fundo escuro, detalhes em amarelo e componentes com glassmorphism.

**Pontos fortes:**
- Design visual consistente e profissional
- Boa hierarquia de conteúdo
- Conteúdo textual bem escrito e direcionado ao cliente
- Navegação lateral clara com numeração
- Responsividade implementada com breakpoints adequados
- `prefers-reduced-motion` suportado
- Imagens em formato WebP (maioria)
- Lazy loading em imagens de serviço

**Problemas críticos:**
1. **Imagens quebradas** na página de instalação (3 imagens de produtos)
2. **Número de WhatsApp incorreto** na página de automação
3. **Número de telefone inconsistente** nos relatórios de equipamentos

**Problemas importantes:**
- Sem Open Graph / Twitter Cards
- Sem Schema.org / dados estruturados
- Sem favicon
- Sem Google Analytics ou similar
- Alt text vazio em múltiplos logos
- Código duplicado nos relatórios de equipamento

**Oportunidades de melhoria:**
- Performance (imagem grande não otimizada, Google Fonts sem display=swap)
- SEO técnico (meta tags, OG, schema)
- Acessibilidade (foco, contraste, labels)
- Conversão (CTAs, formulário de contato)
- Arquitetura (componentização, templates)

---

## 2. PROBLEMAS CRÍTICOS

### 2.1 Imagens de produtos quebradas na página de instalação

| Campo | Detalhe |
|---|---|
| **Problema** | A página `instalacao/index.html` referencia 3 imagens que não existem |
| **Arquivo** | `instalacao/index.html` (linhas 183, 199, 215) |
| **Evidência** | `<img src="../assets/images/ar-gree.webp">`, `<img src="../assets/images/ar-midea.webp">`, `<img src="../assets/images/ar-tcl.webp">` — os arquivos reais são `ar-gree-removebg-preview.png`, `ar-midea-removebg-preview.png`, `ar-tcl-removebg-preview.png` |
| **Impacto** | 3 imagens de produto não aparecem — prejudica a apresentação comercial e a credibilidade |
| **Prioridade** | **Crítica** |
| **Solução** | Corrigir os caminhos ou renomear os arquivos de imagem |
| **Dificuldade** | Simples |

### 2.2 Número de WhatsApp incorreto na página de automação

| Campo | Detalhe |
|---|---|
| **Problema** | O link `wa.me/554598330264` tem 12 dígitos (formato inválido) |
| **Arquivo** | `automacao/index.html` (linhas 110, 244) |
| **Evidência** | `href="https://wa.me/554598330264?text=..."` — formato correto seria `5545988429228` (13 dígitos) |
| **Impacto** | Clientes que clicarem no CTA de automação não conseguirão contato |
| **Prioridade** | **Crítica** |
| **Solução** | Corrigir para `5545988429228` (ou confirmar o número correto da AUTOC) |
| **Dificuldade** | Simples |

### 2.3 Número de telefone inconsistente nos relatórios de equipamento

| Campo | Detalhe |
|---|---|
| **Problema** | Footer dos relatórios mostra `(45) 9854-2732` enquanto o site usa `(45) 98842-9228` |
| **Arquivo** | `equipamentos/0001/index.html`, `0002/index.html`, `0003/index.html` (linha 502) |
| **Evidência** | `Cascavel - PR • WhatsApp: (45) 9854-2732` |
| **Impacto** | Cliente pode tentar contato por número errado; confusão de identidade |
| **Prioridade** | **Crítica** |
| **Solução** | Alinhar com o número correto da empresa: `(45) 98842-9228` |
| **Dificuldade** | Simples |

---

## 3. PROBLEMAS IMPORTANTES

### 3.1 Ausência total de Open Graph e Twitter Cards

| Campo | Detalhe |
|---|---|
| **Problema** | Nenhuma página possui meta tags OG ou Twitter Cards |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Busca por `og:` e `twitter:` retorna 0 resultados |
| **Impacto** | Ao compartilhar no WhatsApp, Facebook, Twitter, o link aparece sem título, descrição ou imagem — péssimo para marketing digital |
| **Prioridade** | **Alta** |
| **Solução** | Adicionar `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description` |
| **Dificuldade** | Simples |

### 3.2 Ausência de Schema.org / Dados Estruturados

| Campo | Detalhe |
|---|---|
| **Problema** | Nenhum JSON-LD ou schema markup no site |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Busca por `application/ld+json` ou `itemscope` retorna 0 |
| **Impacto** | Google não entende o tipo de negócio, serviços, localização — perde rich snippets, Local Business, estrelas |
| **Prioridade** | **Alta** |
| **Solução** | Adicionar `LocalBusiness` schema com nome, telefone, endereço, serviços, horário |
| **Dificuldade** | Média |

### 3.3 Ausência de favicon

| Campo | Detalhe |
|---|---|
| **Problema** | Nenhuma página possui favicon |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Nenhum `<link rel="icon"` ou `apple-touch-icon` presente |
| **Impacto** | Aba do navegador, favoritos e ícone de atalho aparecem sem ícone — aspecto amador |
| **Prioridade** | **Alta** |
| **Solução** | Adicionar favicon.ico, favicon-32x32.png, apple-touch-icon.png |
| **Dificuldade** | Simples |

### 3.4 Alt text vazio em múltiplas imagens de logo

| Campo | Detalhe |
|---|---|
| **Problema** | Logo da Iluminar tem `alt=""` vazio em várias ocorrências |
| **Arquivos** | `index.html` (linha 25), `higienizacao/index.html` (linha 26, 89), `instalacao/index.html` (linha 26, 89), `instalacoes-eletricas/index.html` (linha 27, 90), `seguranca-eletronica/index.html` (linha 27, 90), `automacao/index.html` (linha 27, 90) |
| **Evidência** | `<img src="...logo-iluminar-clara.png" alt="">` |
| **Impacto** | Leitores de tela não identificam a marca; SEO de imagem perdido |
| **Prioridade** | **Alta** |
| **Solução** | Preencher alt com "Iluminar" ou "Logo da Iluminar" |
| **Dificuldade** | Simples |

### 3.5 Código duplicado nos relatórios de equipamento

| Campo | Detalhe |
|---|---|
| **Problema** | 3 arquivos de 507 linhas cada, praticamente idênticos (muda apenas o código 0001/0002/0003) |
| **Arquivos** | `equipamentos/0001/index.html`, `0002/index.html`, `0003/index.html` |
| **Evidência** | Mesmo CSS inline de 319 linhas repetido em cada arquivo |
| **Impacto** | Manutenção extremamente custosa; qualquer alteração precisa ser replicada 3x |
| **Prioridade** | **Alta** |
| **Solução** | Extrair CSS para arquivo compartilhado; usar JS para gerar conteúdo dinâmico ou template engine |
| **Dificuldade** | Média |

### 3.6 Menu toggle fora do header nas páginas internas

| Campo | Detalhe |
|---|---|
| **Problema** | Nas páginas internas, o botão menu-toggle está fora do `<header>`, antes do overlay |
| **Arquivos** | `higienizacao/index.html`, `instalacao/index.html`, `instalacoes-eletricas/index.html`, `seguranca-eletronica/index.html`, `automacao/index.html` |
| **Evidência** | `<button class="menu-toggle">` aparece antes do `<div class="menu-overlay">` e fora do `<header>` |
| **Impacto** | Quebra a semântica HTML; leitores de tela podem confundir a ordem de navegação |
| **Prioridade** | **Alta** |
| **Solução** | Mover o menu-toggle para dentro do `<header>` seguindo o padrão do index.html |
| **Dificuldade** | Simples |

---

## 4. MELHORIAS RECOMENDADAS

### 4.1 Google Fonts sem `display=swap`

| Campo | Detalhe |
|---|---|
| **Problema** | Google Fonts carregada sem o parâmetro `&display=swap` |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | URL termina com `&display=swap` — na verdade, **está correto** (revisado) |
| **Impacto** | N/A — já está implementado |
| **Prioridade** | — |
| **Solução** | N/A |
| **Dificuldade** | — |

**Correção:** Verifiquei novamente e o `display=swap` está presente em todas as páginas. ✅

### 4.2 Imagem `fundo-hero.png` (2.1 MB) não otimizada

| Campo | Detalhe |
|---|---|
| **Problema** | Arquivo de 2.1 MB em PNG, aparentemente não utilizado |
| **Arquivo** | `assets/images/fundo-hero.png` |
| **Evidência** | 2.105.378 bytes — maior arquivo do projeto |
| **Impacto** | Desperdício de espaço em repositório e banda se for usada |
| **Prioridade** | **Média** |
| **Solução** | Converter para WebP (~200-400 KB) ou remover se não utilizada |
| **Dificuldade** | Simples |

### 4.3 Imagens de produto em PNG com fundo

| Campo | Detalhe |
|---|---|
| **Problema** | 3 imagens de produtos em PNG com fundo branco (removebg) |
| **Arquivos** | `ar-gree-removebg-preview.png` (278 KB), `ar-midea-removebg-preview.png` (241 KB), `ar-tcl-removebg-preview.png` (263 KB) |
| **Evidência** | Imagens em PNG poderiam ser WebP com transparência |
| **Impacto** | ~782 KB total que poderiam ser ~150-200 KB em WebP |
| **Prioridade** | **Média** |
| **Solução** | Converter para WebP com fundo transparente |
| **Dificuldade** | Simples |

### 4.4 Aurora effect carrega OGL via CDN

| Campo | Detalhe |
|---|---|
| **Problema** | `aurora.js` importa OGL de CDN externa — dependência de terceiros |
| **Arquivo** | `assets/js/aurora.js` (linha 8) |
| **Evidência** | `import { Renderer, Program, Mesh, Color, Triangle } from "https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm"` |
| **Impacto** | Se o CDN cair, o efeito não funciona. Pode impactar performance em dispositivos fracos |
| **Prioridade** | **Média** |
| **Solução** | Manter como está (fallback graceful já existe) ou bundle local |
| **Dificuldade** | Média |

### 4.5 Sem Google Analytics ou ferramenta de análise

| Campo | Detalhe |
|---|---|
| **Problema** | Nenhum tracking de audiência |
| **Arquivos** | Todos |
| **Evidência** | Nenhum script do Google Analytics, Clarity, Plausible ou similar |
| **Impacto** | Impossível medir tráfego, conversão, comportamento do usuário |
| **Prioridade** | **Média** |
| **Solução** | Adicionar Google Analytics 4 (gratuito) ou Plausible (privacy-friendly) |
| **Dificuldade** | Simples |

### 4.6 WhatsApp float com texto "WA"

| Campo | Detalhe |
|---|---|
| **Problema** | O botão flutuante do WhatsApp mostra apenas "WA" (abreviação) |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | `<a class="whatsapp-float" ...>WA</a>` |
| **Impacto** | "WA" não é intuitivo para todos os usuários; em telas maiores poderia ser mais descritivo |
| **Prioridade** | **Baixa** |
| **Solução** | Usar ícone SVG do WhatsApp ou texto "WhatsApp" + aria-label |
| **Dificuldade** | Simples |

---

## 5. MELHORIAS OPCIONAIS

### 5.1 Ausência de formulário de contato

| Campo | Detalhe |
|---|---|
| **Problema** | Único meio de contato é WhatsApp |
| **Arquivos** | Todos |
| **Evidência** | Nenhum `<form>` ou modal de contato |
| **Impacto** | Clientes que preferem email ou formulário não têm alternativa |
| **Prioridade** | **Baixa** |
| **Solução** | Adicionar formulário de contato com name, email, phone, message |
| **Dificuldade** | Média |

### 5.2 Sem links para Google Maps / endereço

| Campo | Detalhe |
|---|---|
| **Problema** | Não há endereço físico ou link para Google Maps |
| **Arquivos** | Todos |
| **Evidência** | Menção "Cascavel e região" sem endereço ou mapa |
| **Impacto** | Dificulta SEO local e confiança do cliente |
| **Prioridade** | **Baixa** |
| **Solução** | Adicionar endereço e link para Google Maps no footer |
| **Dificuldade** | Simples |

### 5.3 Sem página de FAQ

| Campo | Detalhe |
|---|---|
| **Problema** | Não há seção de perguntas frequentes |
| **Arquivos** | Todos |
| **Evidência** | Nenhuma página de FAQ |
| **Impacto** | Clientes podem ter dúvidas não respondidas |
| **Prioridade** | **Baixa** |
| **Solução** | Criar página de FAQ com schema FAQPage |
| **Dificuldade** | Média |

### 5.4 Sem blog / notícias

| Campo | Detalhe |
|---|---|
| **Problema** | Não há blog ou artigos |
| **Arquivos** | Todos |
| **Evidência** | Nenhuma página de blog |
| **Impacto** | Perde tráfego orgânico de conteúdo informativo |
| **Prioridade** | **Baixa** |
| **Solução** | Criar blog com artigos sobre elétrica, climatização, segurança |
| **Dificuldade** | Complexa |

---

## 6. SEGURANÇA

### 6.1 Informações sensíveis em comentários HTML

| Campo | Detalhe |
|---|---|
| **Problema** | Comentários como `<!-- ALTERE AQUI -->` expostos no HTML |
| **Arquivos** | `equipamentos/0001/index.html`, `0002/index.html`, `0003/index.html` |
| **Evidência** | Múltiplos `<!-- ALTERE AQUI: ... -->` no HTML |
| **Impacto** | Baixo — são apenas instruções de edição, mas revelam que o conteúdo é genérico |
| **Prioridade** | **Baixa** |
| **Solução** | Remover comentários ou usar dados dinâmicos |
| **Dificuldade** | Simples |

### 6.2 Links externos com `rel="noopener"`

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — todos os links externos usam `target="_blank"` com `rel="noopener"` (ou `rel="noopener noreferrer"`) |
| **Arquivos** | Todos |
| **Evidência** | Boa prática de segurança ✅ |
| **Impacto** | Protege contra tabnabbing |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 6.3 Sem HTTPS issues

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — GitHub Pages serve HTTPS automaticamente |
| **Arquivos** | N/A |
| **Evidência** | CNAME configurado para `iluminarcvel.com.br` |
| **Impacto** | ✅ Seguro |
| **Prioridade** | ✅ **OK** |
| **Solução** | — |
| **Dificuldade** | — |

---

## 7. PERFORMANCE

### 7.1 Google Fonts carregada de CDN externo

| Campo | Detalhe |
|---|---|
| **Problema** | Poppins (e Cormorant Garamond na automação) carregadas de fontes.googleapis.com |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap` |
| **Impacto** | ~50-100 KB adicionais, blocking render |
| **Prioridade** | **Média** |
| **Solução** | Usar `preconnect` (já usado) + `preload` para fontes críticas |
| **Dificuldade** | Simples |

### 7.2 Sem lazy loading no hero

| Campo | Detalhe |
|---|---|
| **Problema** | Imagens de hero das páginas internas não têm `loading="lazy"` |
| **Arquivos** | `higienizacao/index.html`, `instalacao/index.html`, `instalacoes-eletricas/index.html`, `seguranca-eletronica/index.html` |
| **Evidência** | `<img src="...hero..."` sem `loading="lazy"` |
| **Impacto** | Imagem hero carregada imediatamente mesmo se abaixo da dobra (pouco impacto pois hero é above the fold) |
| **Prioridade** | **Baixa** |
| **Solução** | Adicionar `loading="eager"` explícito (padrão) ou manter |
| **Dificuldade** | Simples |

### 7.3 Tamanho total de CSS

| Campo | Detalhe |
|---|---|
| **Problema** | 3 arquivos CSS totalizando ~2.160 linhas |
| **Arquivos** | `site.css` (1399 linhas), `autoc.css` (634 linhas), `service-showcase.css` (127 linhas) |
| **Evidência** | ~2.160 linhas de CSS |
| **Impacto** | ~60-80 KB minificado, mas aceitável para site estático |
| **Prioridade** | **Baixa** |
| **Solução** | Minificar CSS, remover duplicações |
| **Dificuldade** | Média |

---

## 8. SEO

### 8.1 Meta tags title e description

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — todas as páginas têm title e meta description únicas |
| **Arquivos** | Todos |
| **Evidência** | Cada página tem `<title>` e `<meta name="description">` personalizados |
| **Impacto** | ✅ Boa prática |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 8.2 Viewport configurada

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — todas as páginas têm viewport |
| **Arquivos** | Todos |
| **Evidência** | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| **Impacto** | ✅ Mobile-friendly |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 8.3 H1 único por página

| Campo | Detalhe |
|---|---|
| **Problema** | Todas as páginas têm um único H1 |
| **Arquivos** | Todos |
| **Evidência** | Cada página tem exatamente 1 `<h1>` |
| **Impacto** | ✅ Boa prática |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 8.4 Noindex nos relatórios

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — relatórios têm `noindex, nofollow` |
| **Arquivos** | `equipamentos/0001/index.html`, `0002/index.html`, `0003/index.html` |
| **Evidência** | `<meta name="robots" content="noindex, nofollow">` |
| **Impacto** | ✅ Correta implementação |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

---

## 9. MOBILE

### 9.1 Responsividade geral

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — boa implementação responsiva |
| **Arquivos** | CSS |
| **Evidência** | Breakpoints em 980px e 700px, grids adaptáveis |
| **Impacto** | ✅ Funciona bem em mobile |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 9.2 Botões em tela cheia no mobile

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — botões viram full width no mobile (boa prática) |
| **Arquivos** | CSS (linha 1303-1308) |
| **Evidência** | `.actions` vira `display: grid` e `.btn` vira `width: 100%` |
| **Impacto** | ✅ Ótimo para touch |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 9.3 Touch targets

| Campo | Detalhe |
|---|---|
| **Problema** | Menus e botões têm tamanho adequado para touch |
| **Arquivos** | CSS |
| **Evidência** | Botões com min-height 48-54px, menu-toggle 48x48px |
| **Impacto** | ✅ Boa usabilidade touch |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

---

## 10. ACESSIBILIDADE

### 10.1 Foco visível implementado

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — `focus-visible` com outline 3px cyan |
| **Arquivos** | CSS (linhas 57-61) |
| **Evidência** | `button:focus-visible, a:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }` |
| **Impacto** | ✅ Boa prática |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 10.2 Aria attributes no menu

| Campo | Detalhe |
|---|---|
| **Problema** | Implementação parcial de aria |
| **Arquivos** | Todos os HTMLs + `menu.js` |
| **Evidência** | `aria-expanded`, `aria-hidden`, `aria-controls`, `aria-label` presentes |
| **Impacto** | ✅ Bom, mas poderia gerenciar foco ao abrir/fechar |
| **Prioridade** | **Média** |
| **Solução** | Adicionar gerenciamento de foco (trap focus dentro do menu quando aberto) |
| **Dificuldade** | Média |

### 10.3 Contraste de cores

| Campo | Detalhe |
|---|---|
| **Problema** | Texto muted (`--muted: #a9bac7`) sobre fundo escuro (`--bg: #03090f`) |
| **Arquivos** | CSS |
| **Evidência** | `#a9bac7` sobre `#03090f` — contraste ~8.3:1 ✅ |
| **Impacto** | ✅ Acessível |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 10.4 Skip to content / pular navegação

| Campo | Detalhe |
|---|---|
| **Problema** | Não há link "Pular para o conteúdo principal" |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Nenhum `<a href="#main-content">` |
| **Impacto** | Usuários de leitor de tela precisam navegar por todo o menu |
| **Prioridade** | **Média** |
| **Solução** | Adicionar skip link como primeiro elemento visível no foco |
| **Dificuldade** | Simples |

---

## 11. UX/UI

### 11.1 Consistência visual entre páginas

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — design consistente (cores, fontes, componentes) |
| **Arquivos** | Todos |
| **Evidência** | Mesma paleta, botões, tipografia, header, footer |
| **Impacto** | ✅ Profissional |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 11.2 Página de automação com identidade visual própria

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — design diferenciado para destacar parceria AUTOC |
| **Arquivos** | `automacao/index.html` + `autoc.css` |
| **Evidência** | Serif `Cormorant Garamond`, paleta mais suave, layout diferente |
| **Impacto** | ✅ Coerente com a proposta de parceria |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 11.3 Preços e informações comerciais

| Campo | Detalhe |
|---|---|
| **Problema** | Preços desatualizados (Julho/2026) |
| **Arquivos** | `instalacao/index.html` (linha 229), `higienizacao/index.html` |
| **Evidência** | `Preços sugeridos em 23/07/2026, sujeitos a alteração` |
| **Impacto** | Se os preços mudarem, o site fica desatualizado |
| **Prioridade** | **Média** |
| **Solução** | Revisar periodicamente ou remover data específica |
| **Dificuldade** | Simples |

---

## 12. CONVERSÃO E VENDAS

### 12.1 CTAs para WhatsApp em todas as páginas

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — CTAs presentes em todas as páginas |
| **Arquivos** | Todos |
| **Evidência** | Botões WhatsApp no hero, cta-band, footer, float |
| **Impacto** | ✅ Múltiplos pontos de conversão |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 12.2 Mensagens personalizadas por página

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — cada WhatsApp link tem texto personalizado |
| **Arquivos** | Todos |
| **Evidência** | `text=Olá%2C%20quero%20agendar%20a%20higienização...` (diferente por página) |
| **Impacto** | ✅ Facilita o atendimento segmentado |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 12.3 Ausência de prova social

| Campo | Detalhe |
|---|---|
| **Problema** | Não há depoimentos, avaliações ou cases |
| **Arquivos** | Todos |
| **Evidência** | Nenhum depoimento de cliente ou antes/depois de serviços |
| **Impacto** | Perde credibilidade e confiança |
| **Prioridade** | **Média** |
| **Solução** | Adicionar seção de depoimentos reais com fotos |
| **Dificuldade** | Média |

---

## 13. ORGANIZAÇÃO DO CÓDIGO

### 13.1 Estrutura geral

| Campo | Detalhe |
|---|---|
| **Problema** | N/A — organização coerente por serviço |
| **Arquivos** | Todos |
| **Evidência** | Pastas: `higienizacao/`, `instalacao/`, `instalacoes-eletricas/`, `seguranca-eletronica/`, `automacao/`, `equipamentos/` |
| **Impacto** | ✅ Fácil navegação e manutenção |
| **Prioridade** | ✅ **OK** |
| **Solução** | Manter |
| **Dificuldade** | — |

### 13.2 Duplicação de menu lateral

| Campo | Detalhe |
|---|---|
| **Problema** | O menu lateral (side-menu) está duplicado em cada página |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Bloco de ~70 linhas idêntico em todas as páginas |
| **Impacto** | Qualquer alteração no menu precisa ser replicada em 7 arquivos |
| **Prioridade** | **Média** |
| **Solução** | Usar includes SSI (Server Side Includes) ou gerar com JS |
| **Dificuldade** | Complexa |

### 13.3 Header duplicado em todas as páginas

| Campo | Detalhe |
|---|---|
| **Problema** | Header e footer replicados em cada HTML |
| **Arquivos** | Todos os HTMLs |
| **Evidência** | Bloco de ~20 linhas de header e ~30 de footer em cada página |
| **Impacto** | Mesmo problema do menu — manutenção custosa |
| **Prioridade** | **Média** |
| **Solução** | Usar template engine, SSI, ou JavaScript para carregar componentes |
| **Dificuldade** | Complexa |

---

## 14. IDEIAS FUTURAS

### 14.1 Criar blog técnico
Artigos sobre "Como escolher o ar-condicionado ideal", "Importância da higienização", "Segurança eletrônica residencial" — traria tráfego orgânico.

### 14.2 Galeria de projetos realizados
Fotos de antes/depois de instalações reais para gerar prova social.

### 14.3 Calculadora de BTUs
Ferramenta interativa que ajuda o cliente a dimensionar o ar-condicionado ideal.

### 14.4 Agendamento online
Integração com calendário (Calendly, Google Calendar) para agendamento de visitas técnicas.

### 14.5 Chatbot WhatsApp
Automação via WhatsApp Business API para responder perguntas frequentes.

### 14.6 Página "Trabalhe Conosco"
Seção para atrair técnicos eletricistas e climatizadores.

### 14.7 Certificações e selos
Exibir selos de certificação, garantia, associações (CREA, etc).

### 14.8 Modo escuro
O site já é escuro, mas poderia ter um toggle para modo claro.

### 14.9 Mapa interativo
Mostrar região de atendimento com mapa interativo.

---

## PLANO DE EXECUÇÃO

### Fase 1 — Correções Críticas (impacto imediato, risco baixo)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 1 | Corrigir caminhos das imagens de produto em `instalacao/index.html` | Crítica | Simples |
| 2 | Corrigir número de WhatsApp na página de automação | Crítica | Simples |
| 3 | Corrigir telefone no footer dos relatórios de equipamento | Crítica | Simples |
| 4 | Corrigir alt text vazio nos logos | Alta | Simples |
| 5 | Mover menu-toggle para dentro do header nas páginas internas | Alta | Simples |

### Fase 2 — SEO e Redes Sociais (alto impacto, baixo risco)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 6 | Adicionar meta tags Open Graph em todas as páginas | Alta | Simples |
| 7 | Adicionar Twitter Cards | Alta | Simples |
| 8 | Adicionar favicon | Alta | Simples |
| 9 | Adicionar Schema.org LocalBusiness (JSON-LD) | Alta | Média |

### Fase 3 — Acessibilidade e UX (médio impacto, médio risco)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 10 | Adicionar link "Pular para conteúdo" | Média | Simples |
| 11 | Melhorar gerenciamento de foco no menu lateral | Média | Média |
| 12 | Substituir "WA" por ícone SVG do WhatsApp | Média | Simples |

### Fase 4 — Performance (médio impacto, baixo risco)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 13 | Converter imagens de produto PNG para WebP | Média | Simples |
| 14 | Otimizar/remover `fundo-hero.png` (2.1 MB) | Média | Simples |
| 15 | Adicionar Google Analytics 4 | Média | Simples |

### Fase 5 — Arquitetura e Manutenção (alto impacto, médio/alto risco)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 16 | Extrair CSS inline dos relatórios para arquivo compartilhado | Alta | Média |
| 17 | Componentizar header/menu/footer (JS includes ou SSI) | Média | Complexa |
| 18 | Minificar CSS | Baixa | Média |

### Fase 6 — Funcionalidades (médio impacto, risco médio)

| # | Tarefa | Prioridade | Dificuldade |
|---|---|---|---|
| 19 | Adicionar seção de depoimentos | Média | Média |
| 20 | Adicionar formulário de contato | Baixa | Média |
| 21 | Adicionar endereço e Google Maps | Baixa | Simples |

---

## PROMPT PARA CLAUDE CODE

Abaixo está o prompt para outro agente (Claude Code) implementar as melhorias aprovadas no projeto Iluminar:

```
Você é um engenheiro de software sênior especializado em frontend. 
Sua tarefa é implementar as melhorias aprovadas no site institucional da Iluminar 
(https://github.com/Neves866/iluminar-site).

REGRAS ABSOLUTAS:
1. NÃO altere a identidade visual do site (cores, fontes, layout)
2. NÃO remova funcionalidades existentes
3. NÃO quebre links ou caminhos de arquivos
4. Preserve todo o conteúdo textual existente
5. Teste cada alteração visualmente antes de concluir

ARQUIVOS DO PROJETO:
- index.html (página principal)
- higienizacao/index.html
- instalacao/index.html
- instalacoes-eletricas/index.html
- seguranca-eletronica/index.html
- automacao/index.html
- equipamentos/0001/index.html, 0002/index.html, 0003/index.html
- assets/css/site.css
- assets/css/autoc.css
- assets/css/service-showcase.css
- assets/js/menu.js
- assets/js/aurora.js

IMPLEMENTE NA SEGUINTE ORDEM:

FASE 1 - CORREÇÕES CRÍTICAS:
1. Corrigir imagens quebradas em instalacao/index.html:
   - Trocar "ar-gree.webp" por "ar-gree-removebg-preview.png"
   - Trocar "ar-midea.webp" por "ar-midea-removebg-preview.png"
   - Trocar "ar-tcl.webp" por "ar-tcl-removebg-preview.png"

2. Corrigir WhatsApp da automação (automacao/index.html):
   - Trocar "wa.me/554598330264" por "wa.me/5545988429228" (confirmar número correto)

3. Corrigir telefone no footer dos relatórios:
   - Trocar "(45) 9854-2732" por "(45) 98842-9228" nos 3 arquivos

4. Corrigir alt text vazio dos logos:
   - Trocar alt="" por alt="Iluminar" em todas as ocorrências

5. Mover menu-toggle para dentro do header nas páginas internas

FASE 2 - SEO:
6. Adicionar Open Graph tags em todas as páginas (og:title, og:description, og:image, og:url, og:type, og:site_name)
7. Adicionar Twitter Cards (twitter:card, twitter:title, twitter:description)
8. Criar e adicionar favicon (favicon.ico, favicon-32x32.png, apple-touch-icon.png)
9. Adicionar Schema.org LocalBusiness JSON-LD em todas as páginas

FASE 3 - ACESSIBILIDADE:
10. Adicionar skip link "Pular para o conteúdo principal" no início do body
11. Melhorar gerenciamento de foco no menu.js (trap focus)
12. Substituir texto "WA" por ícone SVG do WhatsApp nos whatsapp-float

FASE 4 - PERFORMANCE:
13. Converter imagens PNG de produto para WebP e atualizar referências
14. Otimizar ou remover fundo-hero.png (2.1 MB)
15. Adicionar Google Analytics 4 snippet

FASE 5 - ARQUITETURA:
16. Extrair CSS inline dos relatórios para arquivo compartilhado assets/css/report.css
17. Opcional: Componentizar header/menu/footer via JavaScript

NÃO ALTERE:
- Cores, fontes, espaçamentos ou layout
- Conteúdo textual de serviços e benefícios
- Preços e informações comerciais
- Caminhos de URLs do site
- Funcionalidade do efeito Aurora
- Links do WhatsApp (exceto os explicitamente listados acima)
- CNAME, git, ou configuração de deploy
```

---

## CHECKLIST FINAL

| Categoria | Status | Observações |
|---|---|---|
| HTML Semântico | ⚠️ Parcial | Menu toggle fora do header nas páginas internas |
| CSS | ✅ Bom | Bem organizado, responsivo, prefers-reduced-motion |
| JavaScript | ✅ Bom | Menu funcional, Aurora com fallback |
| Responsividade | ✅ Excelente | Breakpoints 980px e 700px |
| Mobile | ✅ Excelente | Touch targets, botões full width |
| Acessibilidade | ⚠️ Parcial | Foco OK, aria OK, mas falta skip link e gerenciamento de foco |
| SEO Técnico | ❌ Ruim | Sem OG, Schema, Twitter Cards, favicon |
| Performance | ⚠️ Regular | Aurora pesado, imagens PNG não otimizadas |
| Segurança | ✅ Boa | noopener, HTTPS, sem vulnerabilidades |
| Conversão | ✅ Boa | CTAs WhatsApp em todas as páginas |
| UX/UI | ✅ Excelente | Design consistente, conteúdo claro |
| Manutenibilidade | ⚠️ Regular | Código duplicado (header, footer, menu, relatórios) |

---

*Auditoria realizada em 07/08/2026. Recomenda-se revisão trimestral.*