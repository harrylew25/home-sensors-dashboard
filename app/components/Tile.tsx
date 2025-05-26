import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thermometer, Droplet, Zap, Lock, LockOpen } from "lucide-react";
import LineChart from "./LineChart";

const IconMap: Record<string, React.ElementType | null> = {
  temp: Thermometer,
  humidity: Droplet,
  energy: Zap,
  dock: Lock,
};

type TileProps = {
  title?: string;
  subtitle?: string;
  type: "temp" | "humidity" | "energy" | "lock";
  data?: Record<string, string | number>[];
  children?: React.ReactNode;
};

const Tile = ({ title, subtitle, type, data, children }: TileProps) => {
  let Icon = IconMap[type];

  if (type === "lock" && subtitle !== "locked") {
    Icon = LockOpen;
  }

  return (
    <div className="m-4">
      <Card className="w-[300px] h-auto bg-zinc-100 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            <div className="flex items-center">
              {subtitle}
              {Icon && <Icon className=" ml-4 w-8 h-8 text-zinc-950" />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {children}
          {data && (
            <div>
              <LineChart data={data} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tile;
