"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface SensorData {
  time: number;
  sensors: Array<{
    id: string;
    name: string;
    type: string;
    value: number;
    unit?: string;
    historicData?: Record<string, string>[];
  }>;
}

// Define the arguments the hook will take
interface UseSensorValueAlertsOptions {
  sensorData: SensorData | undefined; // The data from RTK Query
  monitoredSensorType: string; // The type of sensor to monitor (e.g., 'temperature')
  threshold: number; // The numeric threshold (e.g., 20)
  alertDurationMinutes: number; // How long the toast should stay visible (e.g., 2 minutes)
}

// Convert alert duration to milliseconds
const getAlertDurationMs = (duration: number) => duration * 60 * 1000;

/**
 * Custom hook to display Sonner toasts based on a numeric sensor's value
 * crossing a threshold and returning to it within a time window.
 */
export function useSensorValueAlerts({
  sensorData,
  monitoredSensorType,
  threshold,
  alertDurationMinutes,
}: UseSensorValueAlertsOptions) {
  // --- Refs for managing toast state over time ---
  // Stores the ID of the specific alert toast (e.g., 'above 20' or 'below 20')
  const activeAlertToastId = useRef<string | number | undefined>(undefined);
  // Stores the last known "status" of the numeric value ('above', 'below', 'at')
  const lastNumericStatus = useRef<"above" | "below" | "at" | null>(null);
  // Records the timestamp when the status last changed or an alert toast was shown
  const lastStatusChangeTime = useRef<number>(Date.now()); // Initialize with current time

  const alertDurationMs = getAlertDurationMs(alertDurationMinutes);

  useEffect(() => {
    // Only proceed if valid sensor data is provided
    if (!sensorData) return;

    // Find the specific sensor to monitor based on its type
    const numericSensor = sensorData.sensors.find(
      (s) => s.type === monitoredSensorType && typeof s.value === "number"
    );

    // If the specific sensor isn't found, or its value isn't a number,
    // dismiss any active alert toast and exit.
    if (!numericSensor) {
      if (activeAlertToastId.current) {
        toast.dismiss(activeAlertToastId.current);
        activeAlertToastId.current = undefined;
      }
      return;
    }

    const currentValue = numericSensor.value;
    let currentStatus: "above" | "below" | "at" = "at"; // Default status

    if (currentValue > threshold) {
      currentStatus = "above";
    } else if (currentValue < threshold) {
      currentStatus = "below";
    }

    const now = Date.now();

    // --- Logic for triggering and dismissing toasts ---

    // Condition 1: Transition from 'AT' or 'BELOW' to 'ABOVE threshold'
    if (
      currentStatus === "above" &&
      (lastNumericStatus.current === "below" ||
        lastNumericStatus.current === "at")
    ) {
      if (activeAlertToastId.current) {
        toast.dismiss(activeAlertToastId.current);
      }
      activeAlertToastId.current = toast.info(
        `${numericSensor.name} is now ${currentValue} ${
          numericSensor.unit || ""
        } (above ${threshold})!`,
        { duration: alertDurationMs, id: "sensor-alert" }
      );
      lastStatusChangeTime.current = now;
      lastNumericStatus.current = "above";
    }
    // Condition 2: Transition from 'AT' or 'ABOVE' to 'BELOW threshold'
    else if (
      currentStatus === "below" &&
      (lastNumericStatus.current === "above" ||
        lastNumericStatus.current === "at")
    ) {
      if (activeAlertToastId.current) {
        toast.dismiss(activeAlertToastId.current);
      }
      activeAlertToastId.current = toast.info(
        `${numericSensor.name} is now ${currentValue} ${
          numericSensor.unit || ""
        } (below ${threshold})!`,
        { duration: alertDurationMs, id: "sensor-alert" }
      );
      lastStatusChangeTime.current = now;
      lastNumericStatus.current = "below";
    }
    // Condition 3: Transition back to 'AT threshold' AND within alertDurationMinutes of last status change
    else if (
      currentStatus === "at" &&
      (lastNumericStatus.current === "above" ||
        lastNumericStatus.current === "below") &&
      now - lastStatusChangeTime.current <= alertDurationMs
    ) {
      if (activeAlertToastId.current) {
        toast.dismiss(activeAlertToastId.current);
      }
      activeAlertToastId.current = toast.success(
        `${numericSensor.name} is back to ${currentValue} ${
          numericSensor.unit || ""
        } (at ${threshold})!`,
        { duration: alertDurationMs, id: "sensor-alert" }
      );
      lastStatusChangeTime.current = now; // Reset time for next cycle
      lastNumericStatus.current = "at";
    }
    // Condition 4: If current status persists (e.g., still above threshold) for more than `alertDurationMinutes`
    // and there's an active alert toast, dismiss it.
    else if (
      activeAlertToastId.current &&
      ((currentStatus === "above" &&
        lastNumericStatus.current === "above" &&
        now - lastStatusChangeTime.current > alertDurationMs) ||
        (currentStatus === "below" &&
          lastNumericStatus.current === "below" &&
          now - lastStatusChangeTime.current > alertDurationMs) ||
        (currentStatus === "at" &&
          lastNumericStatus.current === "at" &&
          now - lastStatusChangeTime.current > alertDurationMs))
    ) {
      toast.dismiss(activeAlertToastId.current);
      activeAlertToastId.current = undefined;
    }

    // Always update the last status if the sensor is found, even if no toast was shown.
    // This is important for future transition checks.
    if (numericSensor && lastNumericStatus.current !== currentStatus) {
      lastNumericStatus.current = currentStatus;
      lastStatusChangeTime.current = now; // Only update time if actual status changes
    }
  }, [sensorData, monitoredSensorType, threshold, alertDurationMs]); // Dependencies: reruns when these inputs change
}
