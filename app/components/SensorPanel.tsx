"use client";

import { useAppSelector } from "@/lib/hooks";
import { useGetSensorsQuery } from "@/lib/services/sensorsApi";
import { Suspense } from "react";
import "../msw";
import LoadingScreen from "./LoadingScreen";
import Tile from "./Tile";
import { useSensorValueAlerts } from "@/lib/customHooks/useSensorValueAlerts";
import { RefreshCcwIcon } from "lucide-react";
import { formatLockStatus, formatTimeStamp } from "./util/SensorPanel";

const SensorPanel = () => {
  const filterValue = useAppSelector((state) => state.filter.filter);
  const { isFetching, data, refetch, isSuccess, isError } = useGetSensorsQuery(
    {},
    {
      pollingInterval: 3000, // Poll every 3 seconds
      refetchOnReconnect: true, // Refetch when coming back online
    }
  );

  useSensorValueAlerts({
    sensorData: data,
    monitoredSensorType: "humidity", // Specify the type of sensor to watch
    threshold: 20, // The numeric threshold
    alertDurationMinutes: 1, // The 1-minute window
  });
  useSensorValueAlerts({
    sensorData: data,
    monitoredSensorType: "energy", // Specify the type of sensor to watch
    threshold: 2000, // The numeric threshold
    alertDurationMinutes: 1, // The 1-minute window
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center flex-col">
        <div className="m-20">Error loading sensors data</div>

        <button
          type="button"
          onClick={() => refetch()}
          className="inline ml-2 text-gray-500 hover:text-blue-500 focus:outline-none"
          aria-label="Refresh"
        >
          <RefreshCcwIcon />
        </button>
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
      <div className="flex justify-center flex-wrap">
        {isSuccess &&
          data &&
          data?.sensors
            .filter(
              (
                fil //TODO: fix the typescript error here
              ) => (filterValue === "all" ? fil : fil.type === filterValue)
            )
            .map((item) => {
              return (
                <Tile
                  key={item.id}
                  title={item.name}
                  subtitle={`${
                    item.type === "dock"
                      ? formatLockStatus(item.value)
                      : `${item.value}${item.unit || ""}`
                  }`}
                  type={item.type}
                  data={item?.historicData}
                />
              );
            })}
      </div>
      <p>
        Last updated:
        {data?.time ? formatTimeStamp(data.time) : "Error"}
        <button
          type="button"
          onClick={() => refetch()}
          className="inline ml-2 text-gray-500 hover:text-blue-500 focus:outline-none"
          aria-label="Refresh"
        >
          <RefreshCcwIcon />
        </button>
      </p>
    </Suspense>
  );
};

export default SensorPanel;
