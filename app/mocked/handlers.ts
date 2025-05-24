import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/sensors/data", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Temperature",
        type: "temp",
        value: "22°C",
      },
      {
        id: 2,
        name: "Humidity",
        type: "humidity",
        value: "45%",
      },
      {
        id: 3,
        name: "Energy Consumption",
        type: "energy",
        value: "1500 kWh",
      },
      {
        id: 4,
        name: "Dock Status",
        type: "dock",
        value: "Connected",
      },
    ]);
  }),
];
