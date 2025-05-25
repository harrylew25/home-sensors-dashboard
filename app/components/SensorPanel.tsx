"use client";

import { useAppSelector } from "@/lib/hooks";
import { useGetSensorsQuery } from "@/lib/services/sensorsApi";
import { Suspense } from "react";
import "../msw";
import LoadingScreen from "./LoadingScreen";
import Tile from "./Tile";
import { toast } from "sonner";
import { RefreshCcwIcon } from "lucide-react";
import {
  formatLockStatus,
  formatTimeStamp,
  thresholdCheckMap,
} from "./util/SensorPanel";

const SensorPanel = () => {
  const filterValue = useAppSelector((state) => state.filter.filter);
  const { isFetching, data, refetch, isSuccess, isError } = useGetSensorsQuery(
    {},
    {
      pollingInterval: 3000,
      refetchOnReconnect: true, // Refetch when coming back online
    }
  );

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
              //TODO: fix the typescript error here
              //  @ts-expect-error
              const thresholdCheck = thresholdCheckMap(item.value)[item.type];
              if (thresholdCheck && thresholdCheck.check()) {
                toast(thresholdCheck.message);
              }

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
