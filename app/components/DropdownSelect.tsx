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
import { setFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { sensorTypes } from "../constants";
import { SensorType } from "@/lib/services/sensorsApi";

const DropdownSelect = () => {
  const dispatch = useAppDispatch();
  const onValueChange = (value: string) => {
    dispatch(setFilter(value as "all" | SensorType));
  };
  return (
    <Select onValueChange={onValueChange}>
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
