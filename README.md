# Catálogo de Produtos React

![React](https://img.shields.io/badge/React-18-blue)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v4-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)

Uma aplicação moderna de catálogo de produtos com pesquisa, filtragem e carregamento infinito.

## 📋 Funcionalidades

- **Pesquisa de produtos** com termo personalizado
- **Filtragem por faixa de preço** para melhor navegação
- **Carregamento infinito** para visualização contínua de produtos
- **UI responsiva** adaptada para todos os dispositivos
- **Tratamento de erros** com opção de tentar novamente
- **Indicadores de carregamento** para melhor experiência do usuário
- **Contagem de produtos** exibindo resultados encontrados

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TanStack Query** - Gerenciamento de requisições e estado do servidor
- **Tailwind CSS** - Framework CSS utilitário
- **Custom Hooks** - Para lógica reutilizável de componentes

## 🏗️ Estrutura do Projeto

```
src/
├── app/              # Componentes principais da aplicação
│   └── page/         # Páginas da aplicação (Home)
├── components/       # Componentes reutilizáveis
│   ├── products/     # Componentes relacionados a produtos (PriceFilter, ProductsList)
│   └── ui/           # Componentes de interface genéricos (SearchBar, LoadingIndicator, Errors)
├── hooks/            # Custom hooks (useHomeContainer)
└── services/         # Serviços para comunicação com API
```

## 📦 Componentes Principais

### Hooks

- **useHomeContainer** - Gerencia o estado e lógica da página inicial incluindo busca, filtragem e paginação

### Componentes

- **ProductsList** - Lista responsiva de produtos com referência para carregamento infinito
- **PriceFilter** - Filtro de produtos por faixa de preço
- **SearchBar** - Componente de busca com estado controlado
- **LoadingIndicator** - Indicador visual de carregamento
- **ErrorMessage** - Exibição de erros com opção de tentar novamente

## 🔄 Fluxo de Dados

1. `useHomeContainer` inicializa o estado e os filtros
2. Os produtos são buscados com base nos filtros (termo de busca e faixa de preço)
3. Os produtos são renderizados através do componente `ProductsList`
4. O usuário pode:
   - Pesquisar produtos pelo nome
   - Filtrar produtos por preço
   - Rolar para carregar mais produtos
   - Ver contadores de produtos encontrados
   - Limpar filtros aplicados

## 📱 Responsividade

A interface foi projetada para funcionar em:

- Dispositivos móveis (layouts em coluna única)
- Tablets (layouts adaptados)
- Desktops (aproveitamento do espaço em tela)

## ⚙️ Acessibilidade

A aplicação implementa:

- ARIA labels e roles para melhor navegação com leitores de tela
- Estados "live" para atualizações dinâmicas
- Foco adequado em elementos interativos
- Textos alternativos e mensagens de status

## 🔧 Configuração de Ambiente

Antes de executar o projeto, é necessário configurar corretamente as variáveis de ambiente:

### Arquivos de Ambiente

O projeto utiliza os seguintes arquivos de configuração:

- `.env.development` - Configurações para ambiente de desenvolvimento ou produção

### Variáveis de Ambiente Disponíveis

| Variável           | Descrição                     | Valores Possíveis                             |
| ------------------ | ----------------------------- | --------------------------------------------- |
| `VITE_DISABLE_PWA` | Controla a funcionalidade PWA | `true` (desabilitado) ou `false` (habilitado) |
| `NODE_ENV`         | Define o ambiente de execução | `development` ou `production`                 |

### Como Configurar

1. Verifique se o arquivo `.env.development` existe na raiz do projeto com o seguinte conteúdo:

   ```
   VITE_DISABLE_PWA=false
   NODE_ENV="production"
   ```

2. Para alterar as configurações de produção, crie um arquivo `.env`:

   ```
   VITE_DISABLE_PWA=false
   NODE_ENV="production"
   ```

3. Ajuste os valores conforme necessário:
   - Defina `VITE_DISABLE_PWA=true` se quiser desativar os recursos de PWA durante o desenvolvimento
   - O valor de `NODE_ENV` afeta otimizações de build e comportamentos específicos do ambiente

> **Importante:** O Vite carrega automaticamente o arquivo de ambiente apropriado com base no comando usado (`dev` ou `build`).

## 🖥️ Como Executar

1. Clone o repositório

   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd teste-frontend
   ```

2. Instale as dependências

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Verifique e configure as variáveis de ambiente conforme descrito na seção anterior

4. Execute o servidor de desenvolvimento

   ```bash
   npm start
   # ou
   npm run dev
   # ou
   yarn start
   ```

5. Acesse a aplicação em `http://localhost:3000`

## 🚀 Como Executar em Produção

1. Configure corretamente o arquivo `.env` (veja a seção "Configuração de Ambiente")

2. Construa a aplicação para produção

   ```bash
   npm run build
   # ou
   yarn build
   ```

3. Para testar o build de produção localmente:

   ```bash
   npm run preview
   # ou
   yarn preview
   ```

<!-- 4. Para deploy em produção:

   - **Netlify/Vercel**: Conecte o repositório e configure o comando de build como `npm run build` e o diretório de publicação como `dist`

   - **Servidor web tradicional**: Copie o conteúdo da pasta `dist` para a pasta raiz do seu servidor web

   - **Docker**: Utilize um servidor web como Nginx para servir os arquivos estáticos do diretório `dist` -->
