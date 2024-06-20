interface KPICardProps {
  title: string;
  value: number | string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const KPICard = ({ title, value, Icon }: KPICardProps) => {
  return (
    <div className="flex flex-row space-x-4 rounded-lg bg-white p-4 text-gray-600">
      <div className="flex flex-col gap-2 rounded-lg bg-blue-100 p-4">
        <Icon className="h-8 w-8 fill-current text-blue-500" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-md font-semibold text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;
