export type SensorType = "lock" | "temperature" | "energy" | "humidity";

export type SensorData = {
  id: string;
  name: string;
  type: SensorType;
  value: number;
  unit: string;
  historicData: Array<{ hour: string } & Record<SensorType, number>>;
};

export type LocationSensor = {
  locationId: string;
  location: string;
  sensorData: SensorData[];
};

export const FORMULA = {
  lock: () => (Math.random() > 0.5 ? 1 : 0), // Randomly locked or unlocked
  temperature: () => Math.floor(Math.random() * 30) + 15, // Random temperature between 15 and 45
  humidity: () => Math.floor(Math.random() * 100), // Random humidity between 0 and 100
  energy: () => Math.floor(Math.random() * 5000) + 1000, // Random energy consumption between 1000 and 6000 Wh
};

export const generateList = (
  type: SensorType
): Array<{ hour: string } & Record<SensorType, number>> => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    [type]: FORMULA[type](), // Use the formula to generate values,
  })) as Array<{ hour: string } & Record<SensorType, number>>;
};

export const ALIAS = {
  lock: "lock",
  temp: "temperature",
  energy: "energy",
  humidity: "humidity",
};

const tempDataStructure = [
  "Temperature",
  "temperature",
  FORMULA["temperature"](),
  "°C",
  "temperature",
];
const humidityDataStructure = [
  "Humidity",
  "humidity",
  FORMULA["humidity"](),
  "%",
  "humidity",
];
const energyDataStructure = [
  "Energy Consumption",
  "energy",
  FORMULA["energy"](),
  "Wh",
  "energy",
];
const dockDataStructure = [
  "Dock Status",
  "lock",
  FORMULA["lock"](),
  "",
  "lock",
];
const dataInCheck = [
  tempDataStructure,
  humidityDataStructure,
  energyDataStructure,
  dockDataStructure,
];

export const createSensorData = (
  dataList: (string | number)[][]
): SensorData[] => {
  return dataList.map((item, index) => ({
    id: `sensor-${index + 1}`,
    name: String(item[0]),
    type: item[1] as SensorType,
    value: Number(item[2]),
    unit: String(item[3]),
    historicData: generateList(item[4] as SensorType),
  }));
};

const livingRoomSensorData = ["Living Room", createSensorData(dataInCheck)];
const bedroomSensorData = ["Bedroom", createSensorData(dataInCheck)];
const kitchenSensorData = ["Kitchen", createSensorData(dataInCheck)];
const officeSensorData = ["Office", createSensorData(dataInCheck)];
export const locationSensorData = [
  livingRoomSensorData,
  bedroomSensorData,
  kitchenSensorData,
  officeSensorData,
];

export const getSensorDataByLocation = (
  locationList: (string | SensorData[])[][]
): LocationSensor[] =>
  locationList.map(
    (item, index) =>
      ({
        locationId: `location-${index + 1}`,
        location: item[0],
        sensorData: item[1],
      } as LocationSensor)
  );
