import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import { handleAmount, handleTruncate } from "~/app/utils/util";
import StatusChip from "./StatusChip";
import type { CampaignWithDonations } from "types/campaign";

interface CampaignCardProps {
  campaign: CampaignWithDonations;
  showStatus?: boolean;
}

const CampaignCard = ({ campaign, showStatus = false }: CampaignCardProps) => {
  const total = campaign.donations.reduce(
    (acc, donation) => acc + donation.amount,
    0,
  );

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
        <CardContent className="flex flex-col justify-between">
          <div className="flex flex-col">
            {showStatus && <StatusChip status={campaign.status} />}
            <p className="mt-2 text-lg font-bold">
              {handleTruncate(campaign.title, 20)}
            </p>
            <p className=" h-16 text-gray-500">
              {handleTruncate(campaign.description, 50)}
            </p>
          </div>
          <div className="flex flex-col">
            <LinearProgress
              variant="determinate"
              value={progress > 100 ? 100 : progress}
              className="mt-4"
            />
            <p className="mt-2 text-sm text-gray-500">
              Rp{handleAmount(total)} raised of Rp
              {handleAmount(campaign.target)}
            </p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignCard;
