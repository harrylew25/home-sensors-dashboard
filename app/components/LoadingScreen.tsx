import { Skeleton } from "@/components/ui/skeleton";

const LoadingScreen = ({
  numberOfLines = 2,
  children,
}: {
  numberOfLines?: number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 m-25">
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 mt-4 w-[${index % 2 === 0 ? 400 : 450}px]`}
        />
      ))}
      {children}
    </div>
  );
};

export default LoadingScreen;
