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
      // Refetch every 60 seconds when component is mounted or arg changes
      // refetchOnMountOrArgChange: 60,
      transformResponse: (response) => {
        // Transform the response if needed
        console.log("there is a response");
        return response;
      },
    }),
  }),
});

export const { useGetSensorsQuery } = sensorsApi;
