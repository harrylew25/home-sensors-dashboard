import { http, HttpResponse } from "msw";

// TODO: Simplify these data generation logic
const generateLockStatus = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    lock: Math.random() > 0.5 ? 1 : 0, // Randomly locked or unlocked
  }));
};

const generateTemperatureList = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    temperature: Math.floor(Math.random() * 30) + 15, // Random temperature between 15 and 45
  }));
};

const generateHumidityList = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    humidity: Math.floor(Math.random() * 100), // Random humidity between 0 and 100
  }));
};

const generateEnergyConsumptionList = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    energy: Math.floor(Math.random() * 5000) + 1000, // Random energy consumption between 1000 and 6000 Wh
  }));
};

const mockedData = {
  status: "success",
  message: "Sensor data fetched successfully",
  time: new Date(),
  sensors: [
    {
      id: 1,
      name: "Temperature",
      type: "temp",
      value: 100,
      unit: "°C",
      historicData: generateTemperatureList(),
    },
    {
      id: 2,
      name: "Humidity",
      type: "humidity",
      value: 5,
      unit: "%",
      historicData: generateHumidityList(),
    },
    {
      id: 3,
      name: "Energy Consumption",
      type: "energy",
      value: 4500,
      unit: "Wh",
      historicData: generateEnergyConsumptionList(),
    },
    {
      id: 4,
      name: "Dock Status",
      type: "dock",
      value: 1,
      historicData: generateLockStatus(),
    },
  ],
};

let testSqn = 0;
export const handlers = [
  http.get("/api/sensors/data", () => {
    // This is to always return a fresh mocked data
    // TODO: simplify this logic
    mockedData.time = new Date(); // Update time to current
    mockedData.sensors.forEach((sensor) => {
      if (sensor.type === "dock") {
        // Simulate dock status toggling
        sensor.value = Math.random() > 0.5 ? 1 : 0; // Randomly locked or unlocked
      } else if (sensor.type === "humidity") {
        // Simulate energy consumption with a random value
        if (testSqn === 0) {
          sensor.value = Math.floor(Math.random() * 100) + 1; // Random value between 1000 and 6000 Wh
          testSqn++;
        } else if (testSqn === 1) {
          sensor.value = sensor.value + 20;
          testSqn++;
        } else if (testSqn === 2) {
          sensor.value = sensor.value - 20 < 0 ? 0 : sensor.value - 20;
          testSqn = 0; // Reset sequence
        }
      } else if (sensor.type === "energy") {
        // Simulate energy consumption with a random value
        if (testSqn === 0) {
          sensor.value = Math.floor(Math.random() * 5000) + 1000; // Random value between 1000 and 6000 Wh
          testSqn++;
        } else if (testSqn === 1) {
          sensor.value = sensor.value + 200;
          testSqn++;
        } else if (testSqn === 2) {
          sensor.value = sensor.value - 250;
          testSqn = 0; // Reset sequence
        }
      } else {
        sensor.value = Math.floor(Math.random() * 100) + 1; // Random value between 1 and 100
      }
      sensor.historicData =
        sensor.type === "dock"
          ? generateLockStatus()
          : sensor.type === "temp"
          ? generateTemperatureList()
          : sensor.type === "humidity"
          ? generateHumidityList()
          : generateEnergyConsumptionList();
    });

    return HttpResponse.json(mockedData);
  }),
];
