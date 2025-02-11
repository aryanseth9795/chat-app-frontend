import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  tagTypes: ["/chats"],
  endpoints: (builder) => ({
    mychatList: builder.query({
      query: () => ({ url: "/chats/mychats", credentials: "include" }),
      providesTags: ["chats"],
    }),
  }),
});

// Export hooks for usage in components
export const { useMychatListQuery } = apiSlice;
