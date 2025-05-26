"use client";

import { useOffline } from "@/lib/customHooks/useOffline";
import DropdownSelect from "./components/DropdownSelect";
import RangeSelector from "./components/RangeSelector";
import SensorPanel from "./components/SensorPanel";

import MessageAlert from "./components/MessageAlert";

export default function Home() {
  const isOffline = useOffline();

  if (typeof window === "undefined") {
    // Prevent rendering on the server
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl m-5 text-purple-500">
        Home sensor dashboard Home Page
      </h1>
      {isOffline && <MessageAlert />}

      <div className="flex justify-center flex-wrap">
        <RangeSelector />
        <DropdownSelect />
      </div>
      <SensorPanel />
    </div>
  );
}
