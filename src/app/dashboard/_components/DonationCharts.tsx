"use client";

import type { Donation } from "@prisma/client";
import "chart.js/auto";
import { Chart as ChartJS } from "react-chartjs-2";
import moment from "moment";

interface ChartProps {
  donations: Donation[];
}

const DonationCharts = ({ donations }: ChartProps) => {
  const sevenDays = Array.from({ length: 7 }, (_, i) =>
    moment().subtract(i, "days").format("YYYY-MM-DD"),
  );

  const donationsByDay = sevenDays.map((day) => {
    const donationsOnDay = donations.filter((donation) =>
      moment(donation.createdAt).isSame(day, "day"),
    );
    return donationsOnDay.reduce((acc, donation) => acc + donation.amount, 0);
  });

  console.log(sevenDays);

  return (
    <div className="my-8 flex flex-col space-y-4 rounded-lg bg-white p-4">
      <div className="flex flex-col space-y-6">
        <p className="text-xl font-bold text-gray-600">Daily Donations</p>
        <ChartJS
          type="line"
          className="max-h-96 w-full"
          data={{
            labels: sevenDays
              .map((day) => moment(day).format("MMM D"))
              .reverse(),
            datasets: [
              {
                label: "Raised Funds",
                data: donationsByDay,
                fill: false,
                borderColor: "#3b82f6",
                tension: 0.1,
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
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `Raised Funds: Rp${context.parsed.y}`;
                  },
                },
                intersect: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DonationCharts;
