# JSON API experiments

## Create a mock server with the proposed JSON API output

JSON:API schema described in typescript -

```
interface Author {
  author_id: number,
  name: string,
}

interface AuthorFilterExp {
  $and?: AuthorFilterExp[];
  $or?: AuthorFilterExp[];
  $not?: AuthorFilterExp;
  author_id?: NumberComparisonExp;
  name?: StringComparisonExp;
}

interface AuthorSortExp {
  author_id?: SortDirection;
  name?: SortDirection;
}

interface Articles {
   article_id: Int,
   title: String,
   created: Date,
   author_id: Int,
}
 ```

This author-article schema is describe in `json-api-server/src/interfaces.ts`, including the
fully-typed filter and sort expressions.

To generate the OpenAPI schema for this server, run -

```shell
cd json-api-server && yarn install

```

```shell
yarn dev
```

This will create a OpenAPI schema in `json-api-server/build/openapi_schema.json`.

Using the OpenAPI schema we can run a mock server -

```shell
yarn run-dev
```

## Generate the client

The same OpenAPI schema can be used to generate a client which works with this API.

After generating the clients using any of the tools below, one can get auto-complete on the query
API, and also a typed client.

[Demo](typed_client_demo.webm)

### Generate using openapi-typescript

https://www.npmjs.com/package/openapi-typescript

```shell
npx openapi-typescript ../json-api-server/build/openapi_schema.json -o ./src/schema.d.ts
```

### Generate using swagger-typescript-api

https://www.npmjs.com/package/swagger-typescript-api

```shell
npx swagger-typescript-api -p ../json-api-server/build/openapi_schema.json -o ./src -n myApi.ts
```

### Stainless SDK

Need to generate the client on their UI, and then `npm install` it.

It did not compile after including it in this project's dependency. Support team has responded with
a solution. Need to try that.

## Running the generated the client

I have already generated two clients. The source code of using the client to make queries are in
`json-api-client/src/index.ts`.

To run the client, which will execute the queries present in `index.ts` against the mock server -

```
cd json-api-client && yarn install
```

```shell
yarn dev
```
