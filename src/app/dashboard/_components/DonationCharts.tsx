"use client";

import type { Campaign, Donation } from "@prisma/client";
import "chart.js/auto";
import { Chart as ChartJS, Pie } from "react-chartjs-2";
import moment from "moment";
import { handleAmount } from "~/app/utils/util";

type DonationWithCampaign = Donation & {
  campaign: Pick<Campaign, "title" | "id">;
};

interface ChartProps {
  donations: DonationWithCampaign[];
  // campaigns: Campaign[];
}

const backgroundColors = [
  "#60a5fa",
  "#fbbf24",
  "#d97706",
  "#818cf8",
  "#d97706",
  "#6ee7b7",
];

const DonationCharts = ({ donations }: ChartProps) => {
  const sevenDays = Array.from({ length: 7 }, (_, i) =>
    moment().subtract(i, "days").format("YYYY-MM-DD"),
  ).reverse();

  const donationsByDay = sevenDays.map((day) => {
    const donationsOnDay = donations.filter(
      (donation) =>
        moment(donation.createdAt).isSame(day, "day") &&
        donation.status === "PAID",
    );
    return donationsOnDay.reduce((acc, donation) => acc + donation.amount, 0);
  });

  const totalDonationsByCampaign = donations
    .filter((donation) => donation.status === "PAID")
    .reduce(
      (acc, donation) => {
        if (!acc[donation.campaign.id]) {
          acc[donation.campaign.id] = 0;
        }
        acc[donation.campaign.id] += donation.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  return (
    <div className="my-8 flex flex-col space-y-4">
      <div className="flex flex-col space-y-6 rounded-lg bg-white p-4">
        <p className="text-xl font-bold text-gray-600">Raised Funds Daily</p>
        <ChartJS
          type="line"
          className="max-h-72 w-full"
          data={{
            labels: sevenDays.map((day) => moment(day).format("MMM D")),
            datasets: [
              {
                label: "Raised Funds",
                data: donationsByDay,
                fill: true,
                borderColor: "#60a5fa",
                tension: 0,
                backgroundColor: "rgba(96, 165, 250, 0.1)",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  callback: (value) => `Rp${handleAmount(Number(value))}`,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `Raised Funds: Rp${handleAmount(context.parsed.y)}`;
                  },
                },
                intersect: false,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
          }}
        />
      </div>
      {/* <div className="container flex flex-col gap-2 text-gray-600 sm:flex-row sm:space-x-4"> */}
      <div className="grid  grid-cols-1 gap-4 sm:grid-flow-col">
        <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 sm:col-span-4">
          {/* <p className="text-xl font-bold text-gray-600">
            Raised Funds by Campaigns Daily
          </p> */}
          <ChartJS
            type="bar"
            className="max-h-72 w-full"
            data={{
              labels: sevenDays.map((day) => moment(day).format("MMM D")),
              datasets: Object.keys(totalDonationsByCampaign).map(
                (campaignId, index) => {
                  const campaign = donations.find(
                    (donation) => donation.campaign.id === campaignId,
                  )?.campaign;
                  return {
                    label: campaign?.title ?? "Unknown",
                    data: sevenDays.map((day) => {
                      const donationsOnDay = donations.filter(
                        (donation) =>
                          moment(donation.createdAt).isSame(day, "day") &&
                          donation.status === "PAID" &&
                          donation.campaign.id === campaignId,
                      );
                      return donationsOnDay.reduce(
                        (acc, donation) => acc + donation.amount,
                        0,
                      );
                    }),
                    backgroundColor: backgroundColors[index],
                  };
                },
              ),
            }}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  // stacked: true,
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    callback: (value) => `Rp${handleAmount(Number(value))}`,
                  },
                  // stacked: true,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      return `Raised Funds: Rp${handleAmount(context.parsed.y)}`;
                    },
                  },
                  intersect: false,
                },
              },
            }}
          />
        </div>
        {/* pie charts campaigns */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 sm:col-span-2">
          <Pie
            data={{
              labels: Object.keys(totalDonationsByCampaign).map(
                (campaignId) => {
                  const campaign = donations.find(
                    (donation) => donation.campaign.id === campaignId,
                  )?.campaign;
                  return campaign?.title ?? "Unknown";
                },
              ),
              datasets: [
                {
                  data: Object.values(totalDonationsByCampaign),
                  backgroundColor: backgroundColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },

                tooltip: {
                  callbacks: {
                    label: (context) => {
                      // return `Raised Funds: Rp${handleAmount(context.parsed.y)}`;
                      let label = context.label || "";
                      if (label) {
                        label += ": ";
                      }
                      const value = context.parsed;
                      if (value !== null && value !== undefined) {
                        label += `Rp${handleAmount(value)}`;
                      }
                      return label;
                    },
                  },
                  intersect: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationCharts;
