"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Image from "next/image";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  campaignName: string;
}

const SocialMediaShare = ({
  image,
  text,
  onClick,
}: {
  image: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex cursor-pointer flex-row items-center space-x-2 rounded-lg border border-gray-200 p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <Image src={image} width={25} height={25} alt={text} />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};

const ShareModal = ({ open, onClose, campaignName }: ShareModalProps) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Bersama%20kita%20bisa%21%20Donasi%20untuk%20${encodeURIComponent(campaignName)}&hashtags=UlurkanTangan%2CBerbagi%20`;
    window.open(url, "_blank");
  };
  const handleShareLinkedin = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(campaignName)}&summary=&source=`;
    window.open(url, "_blank");
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bagikan</DialogTitle>
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

      <DialogContent>
        <DialogContentText>
          <p className="text-sm text-gray-500">
            Bagikan program donasi ini ke teman-teman Anda agar lebih banyak
            orang yang peduli.
          </p>
          <div className="mt-4 flex flex-row items-center space-x-4 rounded-lg border border-gray-200 p-2">
            <p className="truncate text-sm text-black">{url}</p>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(url);
              }}
              className="my- rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Salin
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* <SocialMediaShare image="/facebook.svg" text="Facebook" /> */}
            <SocialMediaShare
              image="/twitter.svg"
              text="Twitter"
              onClick={handleShareTwitter}
            />
            {/* <SocialMediaShare image="/whatsapp.svg" text="WhatsApp" /> */}
            <SocialMediaShare
              image="/linkedin.svg"
              text="linkedin"
              onClick={handleShareLinkedin}
            />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
