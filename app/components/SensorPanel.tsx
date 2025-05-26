"use client";

import { useSensorValueAlerts } from "@/lib/customHooks/useSensorValueAlerts";
import { useAppSelector } from "@/lib/hooks";
import { useGetSensorsQuery } from "@/lib/services/sensorsApi";
import { AlertCircleIcon, RefreshCcwIcon } from "lucide-react";
import { Suspense } from "react";
import "../msw";
import LoadingScreen from "./LoadingScreen";
import Tile from "./Tile";
import {
  ColorMapping,
  formatLockStatus,
  formatTimeStamp,
} from "./util/SensorPanel";

const SensorPanel = () => {
  const filterValue = useAppSelector((state) => state.filter.filter);
  const { isFetching, data, refetch, isSuccess, isError } = useGetSensorsQuery(
    undefined, // No arguments needed for this query
    {
      pollingInterval: 3000, // Poll every 3 seconds
      refetchOnReconnect: true, // Refetch when coming back online
    }
  );
  // Custom hooks to monitor specific sensor values and trigger alerts
  useSensorValueAlerts({
    location: "Living Room", // Specify the location to monitor
    sensorData: data?.sensors,
    monitoredSensorType: "humidity", // Specify the type of sensor to watch
    threshold: 20, // The numeric threshold
    alertDurationMinutes: 1, // The 1-minute window
  });
  useSensorValueAlerts({
    location: "Living Room", // Optional location to filter sensors
    sensorData: data?.sensors,
    monitoredSensorType: "energy", // Specify the type of sensor to watch
    threshold: 2000, // The numeric threshold
    alertDurationMinutes: 1, // The 1-minute window
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center flex-col bg-opacity-20 rounded-lg shadow-md p-4 m-4">
        <div className="m-20 flex items-center">
          <AlertCircleIcon color="red" className="mr-4" />
          <span>Error loading sensors data</span>
          <button
            type="button"
            onClick={() => refetch()}
            className={`inline ml-2 text-gray-500 hover:text-blue-500 focus:outline-none ${
              isFetching ? "animate-spin" : ""
            } animate-spin-slow`}
            aria-label="Refresh"
          >
            <RefreshCcwIcon />
          </button>
        </div>
      </div>
    );
  }

  if (isFetching && !data) {
    return <LoadingScreen numberOfLines={10} />;
  }

  if (!isSuccess) {
    // TODO: Create a proper error handling component
    return (
      <div className="m-20">
        Error loading sensors data. Please try again later
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Something caused to re-render 3 times here */}
      <div className="flex flex-col items-center justify-center p-4">
        <p>
          Last updated:
          {data?.time ? formatTimeStamp(data.time) : "Error"}
          <button
            type="button"
            onClick={() => refetch()}
            className={`inline ml-2 text-gray-500 hover:text-blue-500 focus:outline-none ${
              isFetching ? "animate-spin" : ""
            }`}
            aria-label="Refresh"
          >
            <RefreshCcwIcon />
          </button>
        </p>
        <div className="flex flex-wrap justify-center w-full">
          {isSuccess &&
            data?.sensors &&
            data.sensors.map((sensor) => {
              const sensorData = sensor.sensorData;
              sensorData.filter((item) =>
                filterValue === "all" ? item : item.type === filterValue
              );
              return (
                <div
                  key={sensor.locationId}
                  className={`flex flex-col items-center 
                    ${
                      ColorMapping[sensor.location as keyof typeof ColorMapping]
                    }
                    rounded-lg shadow-md p-4 m-4 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 ease-in-out`}
                >
                  <p className="text-xl">{sensor.location}</p>
                  <div className="flex justify-center flex-wrap w-128">
                    {sensorData.map((dataItem) => (
                      <Tile
                        key={dataItem.id}
                        title={dataItem.name}
                        subtitle={`${
                          dataItem.type === "lock"
                            ? formatLockStatus(dataItem.value as 0 | 1)
                            : `${dataItem.value}${dataItem.unit || ""}`
                        }`}
                        type={dataItem.type}
                        data={dataItem?.historicData}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Suspense>
  );
};

export default SensorPanel;
