import { THRESHOLD } from "../../constants";

// TODO: NOT VERY EFFICIENT, BUT WORKS FOR NOW
export const thresholdCheckMap = (value: number) => ({
  temp: {
    check: () => value > THRESHOLD.TEMP,
    message: `The temperature is too high! ${value}°C`,
  },
  energy: {
    check: () => value > THRESHOLD.ENERGY,
    message: `The energy consumption is too high! ${value}W`,
  },
  humidity: {
    check: () => value < THRESHOLD.HUMIDITY,
    message: `The humidity is too low! ${value}%`,
  },
  dock: {
    check: () => value !== 1,
    message: `The door is not locked!`,
  },
});

export const formatLockStatus = (value: 0 | 1) => {
  return value === 1 ? "Locked" : "Unlocked";
};

export const formatTimeStamp = (timestamp: string) => {
  return Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
};
