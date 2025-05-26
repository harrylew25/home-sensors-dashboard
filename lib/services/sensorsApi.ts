import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SensorType = "lock" | "temperature" | "energy" | "humidity";

export type SensorData = {
  id: string;
  name: string;
  type: SensorType;
  value: number;
  unit: string;
  historicData: Array<{ hour: string } & Record<SensorType, number>>;
};

export type Sensor = {
  locationId: string;
  location: string;
  sensorData: SensorData[];
};

export type SensorsResponse = {
  time: string;
  sensors: Sensor[];
  status: string;
  message: string;
};

export const sensorsApi = createApi({
  reducerPath: "sensorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/sensors/",
  }),
  endpoints: (builder) => ({
    getSensors: builder.query<SensorsResponse, void>({
      query: () => "data",
      keepUnusedDataFor: 15, // Cache for 15 seconds
    }),
  }),
});

export const { useGetSensorsQuery } = sensorsApi;
