<p align="center">
  <a href="https://ticto-doc.vercel.app">
    <img src="public/assets/ticto-doc-logo.jpeg" alt="TicTo Doc Logo" width="100" height="100">
  </a>
</p>



# Desafio Frontend Ticto

### Resumo

Este documento descreve o desafio de frontend para a empresa Ticto, detalhando os requisitos, tecnologias utilizadas e instruções para execução do projeto.

Para a realização do desafio foi utilizado a menor quantidade de bibliotecas possíveis. O que pode resultar em um código mais extenso, mas que atende as necessidades do desafio.
Foi usando 'use client' na página para simplificar o desenvolvimento, tendo em vista que não havia limitação no escopo do desafio. Foi usado, também, o hook _useState_ para os estados da aplicação.

## Sobre o projeto

O projeto consiste em um teste de frontend para a empresa Ticto. As solicitações do teste são:
- 1 - Listagem de registros financeiros. O usuário deve conseguir visualizar o total de entradas, saídas e saldo total com base nos registros cadastrados. 
- 2 - O usuário deve poder cadastrar novos registros e visualizar o resultado em tempo real. Neste ponto não é necessário que o registro seja persistido em um banco de dados. Você pode tratar cada elemento como um array de objetos. 
- 3 - É indispensável criar a versão mobile da aplicação. 
- 4 - Tecnologias exigidas: - Next.js em sua última versão - SCSS em versões global e CSS Modules (styles.module.scss) - o uso de styled components não é uma exigência

Esse projeto foi criado usando [Next.js](https://nextjs.org) com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

O Gerenciador de pacotes utilizado foi o [Yarn](https://yarnpkg.com).

### Validações e Regras de Negócio

- Todos os campos do formulário de cadastro de transação são obrigatórios.
- O campo Nome 
  - Deve ter no mínimo 3 caracteres e no máximo 50 caracteres.
  - Não pode estar em branco.
- O campo Valor
  - Deve ser um número.
  - Deve ser maior que 0.
- O campo Categoria
  - Deve ter no mínimo 3 caracteres e no máximo 50 caracteres.
  - Não pode estar em branco.

- O Modal:
  - Deve ser fechado ao clicar no botão de fechar.
  - Sempre será limpo ao ser fechado.

- A validação dos campos é feita ao clicar no botão de adicionar transação e ao ativar o blur dos inputs.

## Iniciando o projeto

Execute os comandos abaixo para iniciar o projeto:

```bash
# Primeiro instale as dependências
yarn

# Execute o projeto em modo de desenvolvimento
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Para executar o projeto em modo de produção, execute:

```bash
# Primeiro crie a build do projeto
yarn build

# Em seguida inicie o projeto em modo de produção
yarn start
```