import { Chip } from "@mui/material";
import type { CampaignStatus, DonationStatus } from "@prisma/client";

const StatusChip = ({
  status,
}: {
  status: DonationStatus | CampaignStatus;
}) => {
  let color;

  switch (status) {
    case "PAID":
    case "ACTIVE":
      color = {
        backgroundColor: "#dbeafe",
        text: "#3b82f6",
      };
      break;
    case "PENDING":
      color = {
        backgroundColor: "#fef9c3",
        text: "#f59e0b",
      };
      break;
    case "EXPIRED":
    case "INACTIVE":
      color = {
        backgroundColor: "#fee2e2",
        text: "#f87171",
      };
      break;
    case "COMPLETED":
      color = {
        backgroundColor: "#d1fae5",
        text: "#10b981",
      };
      break;
    default:
      color = {
        backgroundColor: "#d1d5db",
        text: "#6b7280",
      };
  }

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        color: color.text,
        backgroundColor: color.backgroundColor,
        width: "fit-content",
      }}
    />
  );
};
export default StatusChip;
