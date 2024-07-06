"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import type { DonationWithUser } from "types/campaign";
import DonorCard from "~/app/components/DonorCard";

interface DonorsModalProps {
  open: boolean;
  onClose: () => void;
  donations: DonationWithUser[];
}

const DonorsModal = ({ open, onClose, donations }: DonorsModalProps) => {
  const paidDonations = donations.filter(
    (donation) => donation.status === "PAID",
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
          },
        },
      }}
    >
      <DialogContent className="w-2xl flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Donasi ({donations.length})</p>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="w-xl flex w-full max-w-xl flex-col gap-4">
          {paidDonations.map((donation) => (
            <DonorCard
              key={donation.id}
              image={donation.user?.image}
              name={donation.user?.name ?? "Anonim"}
              amount={donation.amount}
              createdAt={donation.createdAt}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonorsModal;
