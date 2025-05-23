type TileProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const Tile = ({ title, subtitle, children }: TileProps) => {
  return (
    <div className="bg-gray-200 p-4 m-4 rounded-lg shadow-md w-72 h-40 flex flex-col justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <h3>{subtitle}</h3>
      {children}
    </div>
  );
};

export default Tile;
