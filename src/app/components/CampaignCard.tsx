import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import { calculateFunds, handleAmount, handleTruncate } from "~/app/utils/util";
import StatusChip from "./StatusChip";
import type {
  CampaignWithDonations,
  CampaignWithTotalDonations,
} from "types/campaign";
import { HeartIcon, ClockIcon } from "@heroicons/react/24/outline";
import moment from "moment";

interface CampaignCardProps {
  campaign: CampaignWithDonations | CampaignWithTotalDonations;
  showStatus?: boolean;
}

const CampaignCard = ({ campaign, showStatus = false }: CampaignCardProps) => {
  let total = 0;
  let totalDonations = 0;
  if ("donations" in campaign) {
    total = calculateFunds(campaign);

    totalDonations = campaign.donations.filter(
      (donation) => donation.status === "PAID",
    ).length;
  } else {
    total = campaign.totalFunds;
    totalDonations = campaign.totalDonations;
  }

  const progress = (total / campaign.target) * 100;

  return (
    <Card sx={{ borderRadius: "0.5rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={50}
          alt="thumbnail"
          image={campaign.thumbnail}
          className="h-56 w-full object-cover"
        />
        {/* <CardContent className="flex h-60 flex-col justify-between"> */}
        <CardContent
          className={`flex flex-col justify-between ${showStatus ? "h-60" : "h-52 "}`}
        >
          <div className="flex flex-col">
            {showStatus && <StatusChip status={campaign.status} />}
            <p className="mt-2 text-lg font-bold">
              {handleTruncate(campaign.title, 50)}
            </p>
            <p className=" text-gray-500">
              {handleTruncate(campaign.description, 30)}
            </p>
          </div>
          <div className="mt-2 flex flex-col space-y-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center space-x-2 rounded-lg bg-gray-100 p-1.5">
                <HeartIcon className="h-5 w-5 text-gray-500" />
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-xs font-bold text-gray-700">
                    {Math.abs(totalDonations)}
                  </p>
                  <p className="text-xs text-gray-500">Donasi</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <div className="flex flex-row items-center space-x-1">
                  {/* tampilkan sisa hari */}
                  <p className="text-xs font-bold text-gray-700">
                    {Math.abs(moment(campaign.endDate).diff(moment(), "days"))}
                  </p>
                  <p className="text-xs text-gray-500">Hari lagi</p>
                </div>
              </div>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress > 100 ? 100 : progress}
              className="h-2 rounded-full p-1"
            />
            <p className="text-sm text-gray-500">
              <span className="font-bold">Rp{handleAmount(total)} </span>
              terkumpul dari Rp
              {handleAmount(campaign.target)}
            </p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignCard;
