"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
}

interface AmountButtonProps {
  text: string;
  onClick: () => void;
  active: boolean;
}

const AmountButton = ({ text, onClick, active }: AmountButtonProps) => {
  const classes = active
    ? `w-full rounded-lg border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 hover:border-blue-800 border`
    : `w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {text}
    </button>
  );
};

const DonateModal = ({
  open,
  onClose,
  campaignId,
  campaignTitle,
}: DonateModalProps) => {
  const router = useRouter();
  const [amount, setAmount] = useState(10000);
  const [amountText, setAmountText] = useState("10.000");
  const makeDonationMutation = api.donation.makeDonation.useMutation();

  const handleSetAmount = (value: number) => {
    setAmount(value);
    setAmountText(`${value.toLocaleString()}`);
  };

  const handleDonate = async () => {
    try {
      const data = await makeDonationMutation.mutateAsync({
        campaignTitle,
        campaignId,
        amount,
      });
      router.push(data.paymentUrl);
      // console.log(data);
      // onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      if (error.message === "UNAUTHORIZED") {
        router.push("/api/auth/signin");
        return;
      }
      console.error(error);
    }
  };

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
          <p className="text-xl font-bold">Donasi</p>
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
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                text: "Rp10.000",
                onClick: () => handleSetAmount(10000),
                active: amount === 10000,
              },
              {
                text: "Rp50.000",
                onClick: () => handleSetAmount(50000),
                active: amount === 50000,
              },
              {
                text: "Rp100.000",
                onClick: () => handleSetAmount(100000),
                active: amount === 100000,
              },
              {
                text: "Rp1.000.000",
                onClick: () => handleSetAmount(1000000),
                active: amount === 1000000,
              },
            ].map((button) => (
              <AmountButton key={button.text} {...button} />
            ))}
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Nominal lainnya</p>
            <FormControl fullWidth variant="standard">
              {/* <InputLabel htmlFor="standard-adornment-amount">
                Nominal donasi
              </InputLabel> */}
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">Rp</InputAdornment>
                }
                value={amountText}
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/\D/g, ""));
                  if (value) {
                    handleSetAmount(value);
                  }
                }}
              />
            </FormControl>
          </div>
          <p className="text-sm text-gray-500">
            All payments go through a secure gateway
          </p>
        </div>
        <button
          type="button"
          className="mb-4  w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          onClick={handleDonate}
        >
          Lanjut ke pembayaran
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;
