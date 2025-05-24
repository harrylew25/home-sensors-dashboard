import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TileProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const Tile = ({ title, subtitle, children }: TileProps) => {
  return (
    <div className="m-4">
      <Card className="w-[300px] h-[200px] bg-zinc-100 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {subtitle}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Tile;
