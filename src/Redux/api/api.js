import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  tagTypes: ["Chats", "User"],
  endpoints: (builder) => ({
    mychatList: builder.query({
      query: () => ({ url: "/chats/mychats", credentials: "include" }),
      providesTags: ["Chats"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/users/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    friendRequestSend: builder.mutation({
      query: (data) => ({
        url: "/users/sendrequest",
        credentials: "include",
        method: "Put",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/users/getnotification`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    friendRequestAcceptor: builder.mutation({
      query: (data) => ({
        url: "/users/acceptrequest",
        credentials: "include",
        method:"Put",
        body:data
      }),
      invalidatesTags:["Chats"]
    }),
  }),
});

// Export hooks for usage in components
export const {
  useMychatListQuery,
  useLazySearchUserQuery,
  useFriendRequestSendMutation,
  useGetNotificationQuery,useFriendRequestAcceptorMutation
} = apiSlice;
