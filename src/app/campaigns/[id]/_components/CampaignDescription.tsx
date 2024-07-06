"use client";
import { Divider, LinearProgress } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import type { CampaignWithDonationsAndUser } from "types/campaign";
import {
  calculateFunds,
  countPaidDonations,
  handleAmount,
} from "~/app/utils/util";
import ShareModal from "./ShareModal";
import DonorCard from "~/app/components/DonorCard";
import DonorsModal from "./DonorsModal";
import DonateModal from "./DonateModal";

const CampaignDescription = ({
  campaign,
}: {
  campaign: CampaignWithDonationsAndUser;
}) => {
  const totalFunds = calculateFunds(campaign);
  const progress = (totalFunds / campaign.target) * 100;
  const latestThreeDonations = campaign.donations
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .filter((donation) => donation.status === "PAID")
    .slice(0, 3);

  const [shareModal, setShareModal] = useState(false);
  const [donorModal, setDonorModal] = useState(false);
  const [donateModal, setDonateModal] = useState(false);

  return (
    // <div className="flex flex-col md:flex-row-reverse">
    <div className="grid grid-cols-1  md:grid-cols-5">
      <div className="flex h-fit flex-col items-center rounded-xl md:order-last md:col-span-2 md:ml-20 md:border md:border-gray-200 md:p-8 md:shadow-md">
        <Image
          src={campaign.thumbnail}
          width={400}
          height={400}
          alt="hero"
          className="rounded-xl object-cover md:hidden"
        />
        <p className="mt-8 text-left text-left text-2xl font-semibold md:hidden md:text-5xl">
          {campaign.title}
        </p>
        <div className="flex w-full flex-col md:mt-0 md:flex-col-reverse">
          <p className="mt-2 hidden text-sm text-gray-500 md:block">
            <span className="font-bold">
              {" "}
              {Math.abs(moment(campaign.endDate).diff(moment(), "days"))}{" "}
            </span>
            Hari lagi
          </p>
          <LinearProgress
            variant="determinate"
            value={progress > 100 ? 100 : progress}
            className="h-2 w-full rounded-full p-1"
          />
          <div className="mt-4 flex w-full flex-row items-center justify-between md:mb-4">
            <p className="text-sm text-gray-500">
              <span className="text-xl font-bold">
                Rp{handleAmount(totalFunds, 0)}{" "}
              </span>
              terkumpul dari Rp
              {handleAmount(campaign.target, 0)}
            </p>
            <p className="text-sm text-gray-500 md:hidden">
              <span className="font-bold">
                {" "}
                {Math.abs(moment(campaign.endDate).diff(moment(), "days"))}{" "}
              </span>
              Hari lagi
            </p>
          </div>
        </div>

        <button
          type="button"
          className="my-4 w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          onClick={() => setDonateModal(true)}
        >
          Donasi
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
          onClick={() => setShareModal(true)}
        >
          Bagikan
        </button>
        <Divider
          sx={{ marginY: 4, width: "100%" }}
          className="hidden md:block"
        />
        <div className="flex hidden w-full flex-col space-y-4 md:block">
          <p className="text-lg font-semibold">
            Donasi ({countPaidDonations(campaign)})
          </p>
          <div className="flex flex-col space-y-4">
            {latestThreeDonations.map((donation) => (
              <DonorCard
                key={donation.id}
                image={donation.user.image}
                name={donation.user.name}
                amount={donation.amount}
                createdAt={donation.createdAt}
              />
            ))}
            {latestThreeDonations.length === 0 && (
              <p className="text-sm text-gray-500">Belum ada donasi :(</p>
            )}
            <button
              type="button"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => setDonorModal(true)}
            >
              Lihat semua
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-3 flex flex-col space-y-4">
        <p className="hidden text-left text-left text-2xl font-semibold md:block md:text-4xl">
          {campaign.title}
        </p>
        <Image
          src={campaign.thumbnail}
          width={400}
          height={400}
          alt="hero"
          className="hidden rounded-xl object-cover md:block md:w-full"
        />

        <Divider sx={{ marginY: 4, width: "100%" }} />
        <p className="text-lg font-semibold">Kisah Penggalang Dana</p>
        <p className="text-gray-500">{campaign.description}</p>
        <Divider sx={{ marginY: 2, width: "100%" }} className="md:hidden" />
        <div className="flex flex-col space-y-4 md:hidden">
          <p className="text-lg font-semibold">
            Donasi ({countPaidDonations(campaign)})
          </p>
          <div className="flex flex-col space-y-4">
            {latestThreeDonations.map((donation) => (
              <DonorCard
                key={donation.id}
                image={donation.user.image}
                name={donation.user.name}
                amount={donation.amount}
                createdAt={donation.createdAt}
              />
            ))}
            {latestThreeDonations.length === 0 && (
              <p className="text-sm text-gray-500">Belum ada donasi :(</p>
            )}
            <button
              type="button"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => setDonorModal(true)}
            >
              Lihat semua
            </button>
          </div>
        </div>
      </div>
      <ShareModal
        open={shareModal}
        onClose={() => setShareModal(false)}
        campaignName={campaign.title}
      />
      <DonorsModal
        open={donorModal}
        onClose={() => setDonorModal(false)}
        donations={campaign.donations}
      />
      <DonateModal
        open={donateModal}
        onClose={() => setDonateModal(false)}
        campaignId={campaign.id}
        campaignTitle={campaign.title}
      />
    </div>
  );
};

export default CampaignDescription;
