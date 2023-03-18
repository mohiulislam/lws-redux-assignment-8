import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: `/books`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = apiSlice;
