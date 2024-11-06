import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    GetProducts: builder.query({
      query: () => "products",
    }),

    //  New query to search for products based on a search term
    SearchProducts: builder.query({
      query: (SearchProducts) => `products/search?q=${SearchProducts}`, // Search endpoint
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = ProductApi;
