import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  tagTypes: ["Chats","User"],
  endpoints: (builder) => ({
    mychatList: builder.query({
      query: () => ({ url: "/chats/mychats", credentials: "include" }),
      providesTags: ["chats"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/users/search?name=${name}`,
        credentials: "include",
      }),
      providesTags:["User"]
    }),
    friendRequestSend:builder.mutation({
      query:(data)=>({
        url:"/users/sendrequest",
        credentials:"include",
        method:"Put",
        body:data
      }),
      invalidatesTags:["User"]
    })
  }),
});

// Export hooks for usage in components
export const { useMychatListQuery,useLazySearchUserQuery,useFriendRequestSendMutation } = apiSlice;
