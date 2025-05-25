import { http, HttpResponse } from "msw";

const now = new Date();
export const handlers = [
  http.get("/api/sensors/data", () => {
    return HttpResponse.json({
      message: "Sensor data fetched successfully",
      time: now.toISOString(),
      sensors: [
        {
          id: 1,
          name: "Temperature",
          type: "temp",
          value: 100,
          unit: "°C",
        },
        {
          id: 2,
          name: "Humidity",
          type: "humidity",
          value: 5,
          unit: "%",
        },
        {
          id: 3,
          name: "Energy Consumption",
          type: "energy",
          value: 4500,
          unit: "Wh",
        },
        {
          id: 4,
          name: "Dock Status",
          type: "dock",
          value: 1,
        },
      ],
    });
  }),
];
