# Controle de Estoque

Desenvolvido para disciplina de Programação Mobile no curso de Engenharia da Computação.

## Resultado

<div style="flex-direction: row;">
  <image
    style="width: 300px;"
    alt="Aplicativo - Menu"
    src="https://user-images.githubusercontent.com/53984490/169700211-48bb9050-ef78-4651-9eed-f25cd3aff1dd.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Home"
    src="https://user-images.githubusercontent.com/53984490/169700423-08076ed1-020c-428c-9273-775dd1f4a7f3.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Nova Categoria"
    src="https://user-images.githubusercontent.com/53984490/169700543-4445879b-1a33-422d-8aaf-4a44888d6a7d.jpeg" />
  <image
    style="width: 300px;"
    alt="Aplicativo - Validações de Categoria"
    src="https://user-images.githubusercontent.com/53984490/169700593-f401fe7c-6537-4492-a87e-193a7b48127f.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Listagem de Categorias"
    src="https://user-images.githubusercontent.com/53984490/169700672-dc9da004-7cf5-406e-90cf-aa7c08ddddfa.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Exclusão de Categoria"
    src="https://user-images.githubusercontent.com/53984490/169700775-26758a1c-0c70-4794-8d5c-9620c007bced.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Edição de Categoria"
    src="https://user-images.githubusercontent.com/53984490/169700866-fc46f74f-968c-467c-9be9-d069d5b29283.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Novo Produto"
    src="https://user-images.githubusercontent.com/53984490/169701024-263ebdcb-908a-4e96-a804-29faa679b96a.jpeg"
  />
  <image
    style="width: 300px;" 
    alt="Aplicativo - Validações de Produto"
    src="https://user-images.githubusercontent.com/53984490/169701135-0e062c03-690e-4425-a3c5-418533d3940b.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Listagem de Produtos"
    src="https://user-images.githubusercontent.com/53984490/169701212-621033d2-da2b-45e0-ac7a-002133e4ce67.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Exclusão de Produto"
    src="https://user-images.githubusercontent.com/53984490/169701279-e176b048-e02d-48f4-8042-de9f1707d1b2.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Edição de Produto"
    src="https://user-images.githubusercontent.com/53984490/169701315-67e06b70-4a0f-47e6-b62a-ebbd66c10810.jpeg"
  />
  <image
    style="width: 300px;"
    alt="Aplicativo - Listagem de Produtos acabando"
    src="https://user-images.githubusercontent.com/53984490/169701382-59ed3bfd-1ae5-4414-8361-c5cae416fd13.jpeg"
  />
</div>

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
