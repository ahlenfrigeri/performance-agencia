# Agência Criativa Web: SASS modular

Conversão do CSS (já organizado com BEM no Módulo 12) para **SASS** dividido em **partials**. Exercício do Módulo 13 (Pré-processadores CSS) do curso de Front-End da EBAC. O layout continua o mesmo.

## Estrutura

```
index.html            → usa css/estilos.css (o CSS compilado)
css/
└── estilos.css       → gerado pelo SASS (não editar à mão)
scss/
├── estilos.scss      → arquivo principal: junta os partials com @use
├── _variaveis.scss   → cores, fontes, espaçamentos e breakpoints
├── _mixins.scss      → a-partir-de(), botao(), flex(), caixa()
├── _base.scss        → reset e estilos gerais
├── _layout.scss      → container, colunas, grade, seção, cabeçalho, menu, banner, rodapé
└── _componentes.scss → botão, imagem, cartão, avatar, sobre, depoimento, contato, formulário
```

## Recursos do SASS usados

- **Variáveis**: `$cor-primaria`, `$espacamento`, `$bp-desktop`…
- **Mixins** (4): `a-partir-de($largura)` para as media queries, `botao($cor)`, `flex(...)` e `caixa(...)`
- **Operadores**: `$espacamento * 4`, `calc($espacamento / 2)`, `calc($raio * 2 / 3)`
- **Aninhamento** com `&` mantendo o BEM: `.cartao { &__titulo { } }` gera `.cartao__titulo`
- **Módulos** com `@use`, no lugar do antigo `@import`

## Como compilar

Pré-requisito: [Node.js](https://nodejs.org).

```bash
npm install          # instala o sass
npm run sass         # compila scss/estilos.scss → css/estilos.css
npm run sass:watch   # recompila sozinho a cada alteração
```
