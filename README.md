# phillipeburgos.com.br

Site portfólio do Phillipe Burgos, Product Designer.

É tudo HTML, CSS e JavaScript puros. Não tem framework, não tem etapa de build, não precisa instalar nada. Você abre a pasta em qualquer editor, mexe e publica. Qualquer pessoa dev ou qualquer IA entende o código de primeira.

## Estrutura

```
phillipeburgos-site/
├── index.html                      Home (hero, portfólio, como eu trabalho, currículo, contato)
├── projetos/
│   ├── design-system-pluriconnect.html
│   ├── gestao-escolar-pluriconnect.html
│   ├── maratona-enem.html
│   └── ecommerce-nagem.html
├── css/
│   └── style.css                   Todo o visual do site, dividido em 3 partes
├── js/
│   ├── main.js                     Comportamentos de todas as páginas
│   ├── home.js                     Só da home
│   └── projeto.js                  Só das páginas de projeto
├── assets/img/projetos/<projeto>/  Capa e telas de cada case
├── curriculo-phillipe-burgos.pdf   O PDF que o botão "Baixar currículo" entrega
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Ver o site no seu computador

1. Instale o [VS Code](https://code.visualstudio.com/).
2. Abra a pasta `phillipeburgos-site` nele.
3. O VS Code vai sugerir a extensão **Live Server**. Instale.
4. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

O site abre no navegador e atualiza sozinho toda vez que você salva um arquivo.

Dá pra abrir o `index.html` com dois cliques também, mas o Live Server simula melhor o site publicado.

## Primeiras coisas pra ajustar

- [ ] **LinkedIn:** use a busca em todos os arquivos (`Ctrl+Shift+H` no Windows ou `Cmd+Shift+H` no Mac). Procure `SEU-USUARIO` e troque pelo final da URL do seu perfil.
- [ ] **Currículo:** substitua o `curriculo-phillipe-burgos.pdf` pela versão atualizada, mantendo o mesmo nome de arquivo.
- [ ] **Textos dos cases:** são um rascunho feito a partir do currículo. Revise com os fatos reais de cada projeto.
- [ ] **Resultados:** se tiver números (conversão, adoção, tempo, NPS), coloque. É o que mais passa credibilidade.
- [ ] **Imagens:** troque as ilustrações provisórias pelos prints reais (veja abaixo).

## Editar textos

Os textos ficam direto no HTML. Abra a página, procure a frase com `Ctrl+F` e edite.

Cada página de projeto segue a mesma ordem de seções:

1. Título e resumo
2. Ficha (cliente, período, papel, entregas)
3. Capa
4. Contexto, desafio e processo
5. Solução e galeria
6. Resultados e aprendizados
7. Navegação para o projeto anterior e o próximo

## Trocar imagens

Cada projeto tem uma pasta própria em `assets/img/projetos/`, com estes arquivos:

| Arquivo | Onde aparece | Tamanho sugerido |
|---|---|---|
| `capa.svg` | Capa do case, miniatura e fundo no hover da home, e fundo do bloco de anterior/próximo | 1600 × 850 px |
| `tela-1.svg` | Primeira imagem da galeria, que ocupa a largura toda | 1600 × 800 px |
| `tela-2.svg` e `tela-3.svg` | Imagens lado a lado na galeria | 1600 × 900 px |

O jeito mais simples de trocar é exportar do Figma em **.jpg** ou **.webp** e mudar a extensão no HTML.

Por exemplo, a linha abaixo:

```html
<img src="../assets/img/projetos/maratona-enem/capa.svg" ...>
```

vira:

```html
<img src="../assets/img/projetos/maratona-enem/capa.jpg" ...>
```

A busca em todos os arquivos ajuda aqui, porque a capa aparece na home e nas páginas dos projetos vizinhos.

Algumas dicas:

- Exporte em 2x e comprima antes de subir. O [Squoosh](https://squoosh.app/) resolve bem. Mire em menos de 400 KB por imagem.
- Nas telas da galeria, preencha o `alt` com uma descrição curta do que aparece. Isso ajuda leitores de tela e o Google.

## Adicionar um projeto novo

1. Duplique uma página da pasta `projetos/` e renomeie. Use letras minúsculas e hífens, tipo `novo-projeto.html`.
2. Edite os textos e o `<title>`, a `description` e a `canonical` no `<head>`.
3. Crie a pasta `assets/img/projetos/novo-projeto/` com as imagens.
4. Na `index.html`, copie um bloco `<li class="project">` inteiro dentro da lista de projetos e ajuste. Atualize também o número ao lado do título "Portfólio", por exemplo de `(04)` para `(05)`.
5. **Anterior e próximo:** cada página aponta para os vizinhos em dois lugares, nas setas do topo (`data-prev` e `data-next`) e no bloco do fim (`pn-prev` e `pn-next`). Ajuste a página nova e as duas vizinhas.
6. **Contador:** em todas as páginas de projeto, atualize o texto "01 de 04" no topo.
7. Adicione a URL nova no `sitemap.xml`.

A ordem dos projetos na home deve ser a mesma da navegação anterior/próximo, pra pessoa não se perder.

## Cores, fontes e espaçamentos

Tudo isso fica no começo do `css/style.css`, dentro do `:root`:

```css
--bg: #F2EFE9;     /* off-white do fundo */
--ink: #141414;    /* preto */
--red: #E2231A;    /* vermelho dos detalhes */
--radius: clamp(12px, 1.4vw, 20px);     /* arredondamento de todas as imagens */
--display: "Bricolage Grotesque", ...;   /* títulos, menus e botões */
--text: "Schibsted Grotesk", ...;        /* textos */
```

Mudou ali, muda no site inteiro.

Toda `<img>` já nasce com as bordas arredondadas pelo `--radius`, inclusive as que você adicionar depois. Se alguma imagem específica precisar ficar reta, coloque `style="border-radius:0"` nela.

O CSS está dividido em três partes, marcadas com comentários:

1. **Base e componentes:** nav, botões, rodapé, cursor e transições. Valem para todas as páginas.
2. **Home**
3. **Páginas de projeto**

## O que cada arquivo JS faz

**`main.js`**, usado em todas as páginas:
- Barra de progresso de leitura.
- Nav que some ao rolar pra baixo.
- Menu mobile.
- Cursor vermelho, só em computador.
- Copiar e-mail.
- Animação do download do currículo.
- Relógio de Recife.
- Cortina de transição entre páginas.

**`home.js`**:
- Peso variável das letras do nome no hero.
- Item ativo da nav.
- Acordeão da experiência.

**`projeto.js`**:
- Navegar entre projetos com as setas ← e → do teclado.

Todas as animações respeitam a opção "reduzir movimento" do sistema operacional.

## Publicar

Como o site é estático, dá pra hospedar de graça em vários lugares. Os mais simples:

- **Netlify:** crie uma conta e arraste a pasta `phillipeburgos-site` para a área de deploy. Em segundos o site está no ar.
- **Vercel** ou **Cloudflare Pages:** funcionam igual, de preferência ligados a um repositório no GitHub.
- **GitHub Pages:** suba a pasta num repositório e ative o Pages nas configurações.

Depois de publicar, conecte o domínio. A hospedagem escolhida mostra os registros DNS que você precisa configurar. Copie esses registros para o painel do Registro.br, onde o `phillipeburgos.com.br` está registrado. A propagação costuma levar algumas horas.

**Dica:** guarde o projeto num repositório no GitHub. Você ganha histórico de todas as versões, pode desfazer qualquer mudança, e Netlify, Vercel ou Cloudflare publicam sozinhos toda vez que você salva uma alteração.

## Usando outra IA para editar

Cole o texto abaixo no começo da conversa junto com os arquivos que quer mudar:

> Este é o site portfólio do Phillipe Burgos, feito em HTML, CSS e JavaScript puros, sem framework e sem build. Antes de mudar qualquer coisa, leia o README.md.
>
> **Regras de visual**
> - Use só as variáveis de cor e fonte do `:root` em `css/style.css`.
> - Títulos, menus e botões usam Bricolage Grotesque.
> - Textos usam Schibsted Grotesk.
> - Não use caixa alta em rótulos.
>
> **Regras de comportamento**
> - Toda animação precisa respeitar `prefers-reduced-motion`.
> - Todo efeito de hover precisa ter alternativa para toque e foco de teclado.
> - Mantenha alvos de toque com pelo menos 44px.
> - Teste em 360px de largura.
>
> **Regras de texto**
> - Escrita em português do Brasil, natural e sem travessões.
>
> **Regras de estrutura**
> - Não adicione bibliotecas nem frameworks.
> - Ao adicionar ou remover projetos, siga a seção "Adicionar um projeto novo" do README.

## Checklist antes de publicar

- [ ] Link do LinkedIn trocado
- [ ] PDF do currículo atualizado
- [ ] Textos dos cases revisados
- [ ] Imagens reais e comprimidas
- [ ] Testado no celular de verdade, não só no navegador do computador
- [ ] Testado no [PageSpeed Insights](https://pagespeed.web.dev/) depois de publicado
