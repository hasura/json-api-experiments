/* ---- openapi-typescript client -----  */

import type { components, paths } from "./schema.d.ts"; // generated by openapi-typescript
import createClient from "openapi-fetch";

const client = createClient<paths>({ baseUrl: "http://localhost:4010" });

// Schema Obj
type Author = components["schemas"]["Author"];
type Article = components["schemas"]["Article"];

// Path params
type AuthorParams = paths["/authors"]["parameters"];

// Response obj
type SuccessResponse =
  paths["/authors"]["get"]["responses"][200]["content"]["application/json"];
//type ErrorResponse = paths["/authors"]["get"]["responses"][500]["content"]["application/json"]["schema"];

async function getAuthors(): Promise<[Author] | undefined> {
    let { data, error, } = await client.GET("/authors", {
        params: {
            query: {
                sort: {
                    author_id: "Desc"
                },
                filter: {
                    name: {
                        $eq: "foobar"
                    },
                    $or: [
                        {
                            name: {
                                $eq: "John"
                            }
                        },
                        {
                            name: {
                                $eq: "Mark"
                            }
                        }
                    ]
                }
            }
        }
    });

    if (data) {
        console.log("Fetched authors");
        console.log(data);
        return data;
    } else {
        console.error("Error occurred.");
        console.error(error);
    }
}

async function getArticles(): Promise<[Article] | undefined> {
    let { data, error } = await client.GET("/articles", {
        params: {
            query: {
                sort: {
                    author_id: "Desc"
                },
                filter: {
                    $or: [
                        {
                            title: {
                                $eq: "Design and Interpretation of Programs"
                            }
                        },
                        {
                            created: {
                                $lt: "2024-07-01"
                            }
                        }
                    ]
                }
            }
        }
    });

    if (data) {
        console.log("Fetched articles");
        console.log(data);
        return data;

    } else {
        console.error("Error occurred.");
        console.error(error);
    }
}

await getAuthors();

await getArticles();

/* ---- END: openapi-typescript client -----  */


/* ---- openapi-typescript client -----  */
/* Generate client via: npx swagger-typescript-api -p ../json-api-server/build/openapi_schema.json -o ./src -n myApi.ts */

import "./myApi";
import { Api } from "./myApi";

const api = new Api();

const resp = await api.authors.getAuthorsApi(
    {
        filter: {
            name: {
                $eq: "John"
            }
        }
    }
);

console.log(resp);

// The myApi module doesn't compile with current TS options. Throws some stricter TS error. Not spending time to fix it, as its a code generation tool and will always generate faulty code.

/* ---- END: openapi-typescript client -----  */