import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serverUrl from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  tagTypes: ["Chats", "User", "Messages"],
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
        method: "Put",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chats/${chatId}`;
        if (populate) {
          url += url + `?populate=true`;
        }
        return { url, credentials: "include" };
      },
      providesTags: ["Chats"],
      //
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chats/message/${chatId}?page=${page}`,
        credentials: "include",
      }),

      keepUnusedDataFor: 0,
    }),

    sendattachements: builder.mutation({
      query: (files) => ({
        url: "/chats/message/attachment",
        body: files,
        method: "Post",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update",
        method: "Put",
        body: data,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    getMembersforAddinGroups: builder.query({
      query: () => ({
        url: `/chats/membersforgroups`,
        credentials: "include",
      }),
      invalidatesTags: ["Chats"],
    }),

    // now creating new group

    creategroup: builder.mutation({
      query: (body) => ({
        url: "/chats/newgroup",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Chats"],
    }),

    myGroups: builder.query({
      query: () => ({
        url: "/chats/mygroups",
        credentials: "include",
      }),
      // invalidatesTags:["Chats"]
      keepUnusedDataFor: 0,
    }),

    GroupDetails: builder.query({
      query: (id) => ({
        url: `/chats/grpdetail/${id}`,
        credentials: "include",
      }),
      // invalidatesTags:["Chats"]
      keepUnusedDataFor: 0,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useMychatListQuery,
  useLazySearchUserQuery,
  useFriendRequestSendMutation,
  useGetNotificationQuery,
  useFriendRequestAcceptorMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendattachementsMutation,
  useUpdateProfileMutation,
  useGetMembersforAddinGroupsQuery,
  useCreategroupMutation,
  useMyGroupsQuery,
  useGroupDetailsQuery,
} = apiSlice;
