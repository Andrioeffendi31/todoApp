import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export const {} = api;