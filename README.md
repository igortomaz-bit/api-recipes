# Api de receitas

Api desenvolvida Api desenvolvida para obtenção de receitas e seus gifs.


# Especificações

Para o desenvolvimento foram utilizadas as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/) v12.17.0
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)


# Guia de Execução

- É possível executar o projeto localmente ou utilizando o docker. Para execução local, são necessários os seguintes passos:

1. Baixe o projeto em sua máquina;
2. Navegue até a pasta *api-recipes*;
3. Caso deseje utilizar o gerenciador de pacotes [npm](https://www.npmjs.com/), deve-se executar os comandos abaixo:
```sh
$ npm install -g typescript
$ npm install
$ npm run build
$ npm run start
```
4. Caso deseje utilizar o gerenciador de pacotes [yarn](https://yarnpkg.com/), deve-se executar os comandos abaixo:
```sh
$ yarn global add typescript
$ yarn install
$ yarn build
$ yarn start
```
5. Feito isso a api já estará pronta para receber as requisições.

- Para execução utilizando o docker, são necessários os seguintes passos:

1. Baixe o projeto em sua máquina;
2. Navegue até a pasta *api-recipes*;
3. Execute os seguintes comandos:
```sh
$ docker-compose up --build
```

# Requisição

Para as requisições podemos utilizar aplicações que realizam requisições, tais quais: [Postmann](https://www.postman.com/), [Insomnia](https://insomnia.rest/), etc.

A url de requisição possuí a seguinte estrutura: `http://localhost:8081/recipes?i={ingredient_1},{ingredient_2},{ingredient_3}`

### Observações

- A api somente aceita a quantidade de ingredientes maior que zero ou menor que quatro. Qualquer quantidade que não respeite essa regra será devolvido como **400 - Bad Request**
- A api somente aceita nome de ingredientes em inglês.
- Caso não seja encontrado nenhuma receita com os ingredientes informados, será considerado como **204 - No Content**.


# Configurações

Para a utilização da api [giphy](https://developers.giphy.com/) é necessário que seja utilizado uma api key que é obtida através do cadastro nesse [link](https://giphy.com/join?next=%2Foauth%2Fauthorize%2F%3Fresponse_type%3Dcode%26client_id%3DC7yftGDVCAhmaTnJCKv3eNaRsANYTDDf7PA9jZbw%26redirect_uri%3Dhttps%253A%252F%252Fdevelopers.giphy.com%252Foauth%252Fexchange%252F) e criado um app, após isto é fornecido uma chave para que seja utilizado na api.

Para adicionar essa chave à api, basta ir na pasta **api-recipes**, abrir o arquivo **.env** e então substituir a informação **put_key_here** pela chave obtida no processo anterior (caso seja execução local) e também adicionar essa mesma chave no arquivo docker-compose.yml no enviroment **GIPHY_API_KEY** (caso seja execução via docker). 

**Observação 1**: Dentro deste arquivo .env também é possível alterar a porta de execução da api (importante lembrar de também alterar a porta utilizada na execução do Dockerfile).
**Observação 2**: Caso seja execução local e se houver desejo que seja cacheado o retorno dos
repositories, é necessário modificar no arquivo .env o REDIS_ENABLE para true (padrão false).

# Fluxo de execução

A execução da api se da pelos seguintes passos:

1. Recebe a requisição em seu único endpoint.
2. Verifica se foram enviados os ingredientes.
3. Se não foi enviado os ingredientes é devolvido o erro **400 - Bad Request**.
4. Se foi enviado, a api irá quebrar os ingredientes em um array de string que representa a property da resposta denominada "keywords".
5. Com os ingredientes, consulta a api [Recipe Puppy](http://www.recipepuppy.com/about/api/) para obter as informações das receitas. Caso não encontre, devolve o erro **204 - No Content**.
6. Depois de obter as receitas, extrai as informações da resposta da api (title, ingredients, link) e devolve um objeto já com estas propriedades.
7. Após isto, o sistema gera uma **promise** para cada receita devolvida nos passos anteriores e então executa de forma paralessa com o **PromiseAll** todas as requisições para buscar os gifs para a resposta.
8. Com as respostas recebidas, ele adiciona o link do gif em uma propriedade gif no objeto das receitas previamente criadas e devolve para o usário junto da propriedade "keywords", conforme solicitação do desafio.