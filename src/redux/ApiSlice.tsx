import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import secureLocalStorage from "react-secure-storage";

export const INotesApi = createApi({
  reducerPath: "INotesApi", // Updated to match the API name
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { endpoint }) => {
      // Check if the endpoint requires authorization
      if (!["createUser", "login"].includes(endpoint)) {
        const token = secureLocalStorage.getItem("authToken"); // Use secureLocalStorage for Bearer token
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // **GET Request (Generic)**
    getAllData: builder.query({
      query: (url) => `${url}`,
    }),

    // **POST Request (Generic)**
    getAllPostData: builder.query({
      query: (url) => ({
        url,
        method: "POST",
        body: {},
      }),
    }),

    // **Delete API**
    deleteApi: builder.mutation({
      query: ({ url, id }) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
    }),

    // **Update API**
    updateApi: builder.mutation({
      query: ({ url, id, data }) => ({
        url: `${url}/${id}`,
        method: "PUT",
        body: data, // Data to update
      }),
    }),

    // **Create User API (No Authorization)**
    createUser: builder.mutation({
      query: (data) => ({
        url: "createUser",
        method: "POST",
        body: data,
      }),
    }),

    // **Login API (No Authorization)**
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            // Store the token in secureLocalStorage after login
            secureLocalStorage.setItem("authToken", data.token);
          }
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
  }),
});

export const {
  useGetAllDataQuery,
  useGetAllPostDataQuery,
  useDeleteApiMutation,
  useUpdateApiMutation,
  useCreateUserMutation,
  useLoginMutation,
} = INotesApi;
