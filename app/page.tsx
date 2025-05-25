"use client";

import DropdownSelect from "./components/DropdownSelect";
import RangeSelector from "./components/RangeSelector";
import SensorPanel from "./components/SensorPanel";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // This ensures the worker only runs in the browser
  import("./mocked/browser").then(({ worker }) => {
    worker.start();
  });
}

export default function Home() {
  return (
    <Provider store={store()}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl m-5 text-purple-500">
          Home sensor dashboard Home Page
        </h1>
        <div className="flex justify-center flex-wrap">
          <RangeSelector />
          <DropdownSelect />
        </div>
        <SensorPanel />
      </div>
    </Provider>
  );
}
