import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: `/books`,
        method: "GET",
      }),
    }),
    addBook: builder.query({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookQuery } = apiSlice;
