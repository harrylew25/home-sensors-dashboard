import { http, HttpResponse } from "msw";
import {
  getSensorDataByLocation,
  locationSensorData,
  FORMULA,
  generateList,
  ALIAS,
  SensorType,
} from "./util/handler-helper";

const mockedData = {
  status: "success",
  message: "Sensor data fetched successfully",
  time: new Date(),
  sensors: getSensorDataByLocation(locationSensorData),
};

let testSqn = 0;
export const handlers = [
  http.get("/api/sensors/data", () => {
    mockedData.time = new Date(); // Update time to current
    mockedData.sensors.forEach((sensor) => {
      sensor.sensorData.forEach((sensorDataItem) => {
        if (
          sensorDataItem.type === "lock" ||
          sensorDataItem.type === "temperature"
        ) {
          sensorDataItem.value = FORMULA[sensorDataItem.type]();
        } else if (sensorDataItem.type === "energy") {
          if (testSqn === 0) {
            sensorDataItem.value = FORMULA["energy"]();
            testSqn++;
          } else if (testSqn === 1) {
            sensorDataItem.value = sensorDataItem.value + 200;
            testSqn++;
          } else if (testSqn === 2) {
            sensorDataItem.value = sensorDataItem.value - 250;
            testSqn = 0; // Reset sequence
          }
        } else if (sensorDataItem.type === "humidity") {
          if (testSqn === 0) {
            sensorDataItem.value = FORMULA["humidity"]() + 1;
            testSqn++;
          } else if (testSqn === 1) {
            sensorDataItem.value = sensorDataItem.value + 20;
            testSqn++;
          } else if (testSqn === 2) {
            sensorDataItem.value =
              sensorDataItem.value - 20 < 0 ? 0 : sensorDataItem.value - 20;
            testSqn = 0; // Reset sequence
          }
        }

        sensorDataItem.historicData = generateList(
          (ALIAS[sensorDataItem.type as keyof typeof ALIAS] as SensorType) ||
            (sensorDataItem.type as SensorType)
        );
      });
    });

    return HttpResponse.json(mockedData);
  }),
];
