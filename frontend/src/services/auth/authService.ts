import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl;
if (process.env.NODE_ENV === "development") {
  baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
} else {
  baseUrl = "/api/users";
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
