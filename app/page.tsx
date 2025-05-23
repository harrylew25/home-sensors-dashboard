import Tile from "./components/Tile";

// should fetch data from /api/sensors/data
const item = {
  timestamp: "2025-03-21T10:30:00Z",
  sensors: [
    { sensorId: "sensor_001", temperature: 42 },
    { sensorId: "sensor_002", humidity: 18 },
    { sensorId: "sensor_003", energy: 2100 },
    { sensorId: "sensor_004", doorLockStatus: "locked" },
  ],
};
console.log(item);

const exampleData = {
  timeStamp: "2023-10-01T12:00:00Z",
  sensors: [
    { id: 1, type: "temperature", value: 31 },
    { id: 2, type: "humidity", value: 70 },
    { id: 3, type: "energy", value: 2000 },
    { id: 4, type: "dockLockStatus", value: "locked" },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Home sensor dashboard Home Page</h1>
      <div className="flex justify-center flex-wrap">
        <Tile title="Temperature" subtitle="31°C" />
        <Tile title="Humidity" subtitle="70" />
        <Tile title="Energy Consumption" subtitle="2000W" />
        <div>
          <Tile title="Dock Lock Status" subtitle="Locked">
            <p>Dock Lock Status: {exampleData.sensors[3].value}</p>
          </Tile>
        </div>
      </div>
      <p>Last updated: 2023-10-01</p>
    </div>
  );
}
