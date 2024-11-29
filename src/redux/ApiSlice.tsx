import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import secureLocalStorage from "react-secure-storage";

export const INotesApi = createApi({
  reducerPath: "INotesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers) => {
      const token = secureLocalStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllData: builder.query({
      query: (url) => `${url}`,
    }),

    getAllPostData: builder.query({
      query: ({url}) => ({
        url,
        method: "POST",
        body: {},
      }),
    }),

    deleteApi: builder.mutation({
      query: ({ url, id }) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
    }),

    updateApi: builder.mutation({
      query: ({ url, id, data }) => ({
        url: `${url}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    
  }),
});

export const {
  useGetAllDataQuery,
  useGetAllPostDataQuery,
  useDeleteApiMutation,
  useUpdateApiMutation,
} = INotesApi;
