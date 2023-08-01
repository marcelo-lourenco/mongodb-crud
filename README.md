# CRUD - Node.js - Express - MongoDB - Dotenv

Este é um exemplo de aplicativo CRUD em Node.js usando MongoDB.

## Instalação

`npm install`

## Configuração

### Variáveis de ambiente

Renomear o arquivo `.env.example` para `.env`

Informar as variáveis do seu ambiente

* `MONGODB_CLUSTER=cluster0.nome.mongodb.net`
* `MONGODB_DATABASE=nomeDoBanco`
* `MONGODB_USER=usuario`
* `MONGODB_PASS=senha`

## Execução
`node server.js`

## Utilização
`http://localhost:3000/historico/`

## Rotas

### - listar
Lista todos os registros

`http://localhost:3000/historico/listar`

### - consultar
Consulta registros com base nos parâmetros `cpf`, `dataCriacaoDe` e  `dataCriacaoAte`

`http://localhost:3000/historico/consultar?cpf=123.456.789-00&dataCriacaoDe=2023-06-01&dataCriacaoAte=2023-07-31 `

### - consultartrintadias
Consulta registros com base nos parâmetros `cpf` e com data de criação nos últimos 30 dias

`http://localhost:3000/historico/consultartrintadias?cpf=123.456.789-00 `

### - incluir
Inclui registros

`http://localhost:3000/historico/incluir`

### - editar
Edita o registro com base no CPF informado

`http://localhost:3000/historico/editar/123.456.789-00`

### - excluir
Exclui o registro com base no CPF informado

`http://localhost:3000/historico/excluir/123.456.789-00 `

## Recursos disponíves

* Gerador de massa (`helper/gerar-massa.js`)
* Collection Postman (`helper/mongodb-crud.postman_collection.js`)
