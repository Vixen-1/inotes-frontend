import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import secureLocalStorage from 'react-secure-storage';

export const TodoApi = createApi({
  reducerPath: 'apii',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://todo-cloudy.onrender.com/api',
    prepareHeaders: (headers) => {
      const token = secureLocalStorage.getItem("authToken");
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => '/notes/fetchallnotes',
    }),
    getUserData: builder.query({
      query: () => ({
        url: '/auth/getuser',
        method: 'POST',
        body:{}
      }),
    }),
    addNote: builder.mutation({
      query: (note) => ({
        url: '/notes/addnote',
        method: 'POST',
        body: note,
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notes/updatenote/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteNote: builder.mutation({
      query: ({id}) => ({
        url: `/notes/deletenote/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useGetAllDataQuery,
  useGetUserDataQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = TodoApi;
