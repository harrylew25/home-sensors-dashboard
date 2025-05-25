"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChart {
  data: Record<string, string | number>[];
}

const LineChart = ({ data }: LineChart) => {
  if (!data) {
    return <></>;
  }
  const xAxisDataKey = Object.keys(data[0] || {})[0];
  const lineDataKey = Object.keys(data[0] || {})[1];

  const chartConfig = {
    [lineDataKey]: {
      label: `${[lineDataKey[0].toUpperCase()]}${lineDataKey.slice(1)}`,
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <RechartsLineChart
        accessibilityLayer
        data={data}
        margin={{ top: 30, right: 15, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          type="natural"
          dataKey={lineDataKey}
          stroke={chartConfig[lineDataKey].color}
          dot={false}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
};

export default LineChart;
