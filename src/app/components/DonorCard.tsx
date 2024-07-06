import Image from "next/image";
import { handleAmount } from "../utils/util";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

interface DonorCardProps {
  image?: string | null;
  name: string;
  amount: number;
  createdAt: Date;
}

const DonorCard = ({ image, name, amount, createdAt }: DonorCardProps) => {
  return (
    <div className="flex w-full flex-row items-center space-x-4">
      <Image
        src={image ?? "/profile.png"}
        width={40}
        height={40}
        alt="avatar"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-sm">{name}</p>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm font-semibold">Rp{handleAmount(amount, 1)}</p>
          {/* dot */}
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <p className="text-sm text-gray-500">{moment(createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;
