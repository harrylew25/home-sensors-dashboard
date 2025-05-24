'use client";';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "../store/useFilterStore";

const sensorTypes = [
  { value: "all", label: "All" },
  { value: "temp", label: "Temperature" },
  { value: "humidity", label: "Humidity" },
  { value: "energy", label: "Energy Consumption" },
  { value: "dock", label: "Lock Status" },
];

const DropdownSelect = () => {
  const setFilter = useFilterStore((state) => state.setFilter);
  return (
    // @ts-expect-error
    <Select onValueChange={(sensor) => setFilter(sensor)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type of sensor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type of Sensor</SelectLabel>
          {sensorTypes.map((sensor) => (
            <SelectItem key={sensor.value} value={sensor.value}>
              {sensor.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropdownSelect;
