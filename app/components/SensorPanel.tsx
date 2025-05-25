import { useAppSelector } from "@/lib/hooks";
import { useGetSensorsQuery } from "@/lib/services/sensorsApi";
import { Suspense } from "react";
import "../msw";
import LoadingScreen from "./LoadingScreen";
import Tile from "./Tile";

const formatTimeStamp = (timestamp: string) => {
  return Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
};

const SensorPanel = () => {
  const filterValue = useAppSelector((state) => state.filter.filter);

  const { isFetching, data, refetch, isSuccess } = useGetSensorsQuery({});

  if (isFetching && !data) {
    return <LoadingScreen numberOfLines={10} />;
  }

  if (!isSuccess) {
    // TODO: Create a proper error handling component
    return <div className="m-20">Error loading sensors data</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              return (
                <Tile
                  key={item.id}
                  title={item.name}
                  subtitle={item.value}
                  type={item.type}
                />
              );
            })}
      </div>
      <p>
        Last updated:
        {data?.time ? formatTimeStamp(data.time) : "Error"}
      </p>
      <button // TODO: change this to an icon button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
        onClick={() => {
          console.log("button is clicked");
          refetch();
        }}
      >
        Refresh
      </button>
    </Suspense>
  );
};

export default SensorPanel;
