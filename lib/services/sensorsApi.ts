import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sensorsApi = createApi({
  reducerPath: "sensorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/sensors/",
  }),
  endpoints: (builder) => ({
    getSensors: builder.query({
      query: () => "data",
      keepUnusedDataFor: 15, // Cache for 15 seconds
    }),
  }),
});

export const { useGetSensorsQuery } = sensorsApi;
