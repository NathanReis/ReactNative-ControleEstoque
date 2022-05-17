# Controle de Estoque

Desenvolvido para disciplina de Programação Mobile no curso de Engenharia da Computação.

## Como executar

### Com containers

Primeiro, é preciso configurar as viráveis de ambiente, para isso, crie uma
cópia dos arquivos `.env.example` disponíveis nos seguintes locais:

- `api/.env.example` para `api/.env`;
- `docker/mongodb/.env-mongo-express.example` para `docker/mongodb/.env-mongo-express`;
- `docker/mongodb/.env-mongodb.example` para `docker/mongodb/.env-mongodb`;
- `mobile/.env.example` para `mobile/.env`.

Após a configuração, basta executar o seguinte comando:

```bash
docker-compose up -d
```

### Local com `yarn`

Primeiro, é preciso configurar o objeto responsável pelas variáveis de ambiente,
para isso, acesse os seguintes arquivos e coloque os valores corretos nos
atributos do objeto:

- `api/src/config/environment.js`;
- `mobile/src/config/environment.ts`.

Após a configuração, basta executar os seguintes comandos:

- Executar a API (necessário estar na pasta `api`)
```bash
yarn
yarn nodemon
```

- Executar o app (necessário estar na pasta `mobile`)
```bash
yarn
yarn start
```

### Local com `npm`

Primeiro, é preciso configurar o objeto responsável pelas variáveis de ambiente,
para isso, acesse os seguintes arquivos e coloque os valores corretos nos
atributos do objeto:

- `api/src/config/environment.js`;
- `mobile/src/config/environment.ts`.

Após a configuração, basta executar os seguintes comandos:

- Executar a API (necessário estar na pasta `api`)
```bash
npm i
npx nodemon
```

- Executar o APP (necessário estar na pasta `mobile`)
```bash
npm i
npm run start
```

### Observações

Quando executado com containers, será criado o seguinte ambiente:

- Porta 27017: MongoDB (Banco de Dados);
- Porta 8081: Mongo Express (Interface web para gerenciamento do MongoDB);
- Porta 3000: API;
- Porta 19000: APP.

Já caso seja executado via `yarn` ou `npm`, será executado apenas a API e o APP,
ou seja, é preciso que você possua um MongoDB configurado por conta própria,
seja na cloud, com o Mongo Compass ou qualquer outra coisa.


## Integrantes

| Nome        |                                         |
| ----------- | --------------------------------------- |
| João Felipe | [GitHub](https://github.com/JFelipeAB)  |
| Nathan Reis | [GitHub](https://github.com/NathanReis) |
