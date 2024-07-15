import { ApiMapper } from "ts-oas";

/*
 * Author {
 *   author_id: Int,
 *   name: String,
 * }
 *
 * Articles {
 *   article_id: Int,
 *   title: String,
 *   created: Date,
 *   author_id: Int,
 * }
*/

type NumberComparisonExp = { "$eq": number } | { "$neq": number } | { "$gt": number } | { "$lt": number } | { "$gte": number } | { "$lte": number };
type StringComparisonExp = { "$eq": string } | { "$neq": string } | { "$gt": string } | { "$lt": string } | { "$gte": string } | { "$lte": string };
type DateComparisonExp = { "$eq": Date } | { "$neq": Date } | { "$gt": Date } | { "$lt": Date } | { "$gte": Date } | { "$lte": Date };
type SortDirection = "Asc" | "Desc";

interface Page {
  "[limit]"?: number;
  "[offset]"?: number;
};

interface Author {
  author_id: number,
  name: string,
};

interface AuthorFilterExp {
  $and?: AuthorFilterExp[];
  $or?: AuthorFilterExp[];
  $not?: AuthorFilterExp;
  author_id?: NumberComparisonExp;
  name?: StringComparisonExp;
};

interface AuthorSortExp {
  author_id?: SortDirection;
  name?: SortDirection;
};

interface Article {
  article_id: number,
  title: string,
  created: Date,
  author_id: number,
};

interface ArticleFilterExp {
  $and?: ArticleFilterExp[];
  $or?: ArticleFilterExp[];
  $not?: ArticleFilterExp;
  article_id?: NumberComparisonExp;
  title?: StringComparisonExp;
  created?: DateComparisonExp;
  author_id?: NumberComparisonExp;
};

interface ArticleSortExp {
  name?: SortDirection;
  article_id?: SortDirection;
  title?: SortDirection;
  created?: SortDirection;
  author_id?: SortDirection;
};

// Recommended to use ApiMapper to help to keep the format valid.
/**
 * Authors select many description.
 * @summary Query authors collection with filtering, sorting, pagination capabilities.
 */
export type GetAuthorsAPI = ApiMapper<{
  path: "/authors";
  method: "GET";
  query: {
    filter?: AuthorFilterExp,
    sort?: AuthorSortExp,
    page?: Page,
  };
  responses: {
    /**
     * @contentType application/json
     */
    "200": Author[];
    /**
     * No Content
     */
    "204": never;
    "404": { success: false };
  };
}>;

/**
 * Articles select many description.
 * @summary Query articles collection with filtering, sorting, pagination capabilities.
 */
export type GetArticlesAPI = ApiMapper<{
  path: "/articles";
  method: "GET";
  query: {
    filter?: ArticleFilterExp,
    sort?: ArticleSortExp,
    page?: Page,
  };
  responses: {
    /**
     * @contentType application/json
     */
    "200": Article[];
    /**
     * No Content
     */
    "204": never;
    "404": { success: false };
  };
}>;
