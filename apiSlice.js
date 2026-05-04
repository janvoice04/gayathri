import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
   
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Complaint"],

  endpoints: (builder) => ({
  register: builder.mutation({
  query: (body) => ({
    url: "/register",
    method: "POST",
    body,
  }),
}),
  
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    getComplaints: builder.query({
      query: () => "/getAllIssues",
      providesTags: ["Complaint"],
    }),
    getUsers: builder.query({
      query: () => "/getAllUsers",
      providesTags: ["User"],
    }),
    updateIssue: builder.mutation({
  query: (body) => ({
    url: "/updateIssue",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Complaint"], 
}),

deleteIssue: builder.mutation({
  query: (body) => ({
    url: "/deleteIssue",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Complaint"], 
}),

  }),
});


export const {
  useLoginMutation,
  useRegisterMutation,   
  useGetComplaintsQuery,
  useGetUsersQuery,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = apiSlice;