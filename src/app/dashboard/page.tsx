import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import PageWrapper from "../components/PageWrapper";
import {
  BanknotesIcon,
  ArchiveBoxArrowDownIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import KPICard from "../components/KPICard";

import DonationCharts from "./_components/DonationCharts";
import DonationTable from "./_components/DonationTable";
import { handleAmount } from "../utils/util";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const campaigns = await api.campaign.getAll();
  const donations = await api.donation.getAll();

  const totalDonation = donations
    .filter((donation) => donation.status === "PAID")
    .reduce((acc, donation) => acc + donation.amount, 0);

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
        <KPICard
          title="Dana Terkumpul"
          value={`Rp${handleAmount(totalDonation)}`}
          Icon={BanknotesIcon}
        />
        <KPICard
          title="Donasi"
          value={handleAmount(donations.length)}
          Icon={ArchiveBoxArrowDownIcon}
        />
        <KPICard
          title="Kampanye"
          value={handleAmount(campaigns.length)}
          Icon={GlobeAmericasIcon}
        />
      </div>
      <DonationCharts donations={donations} />
      <DonationTable donations={donations} />
    </PageWrapper>
  );
}
