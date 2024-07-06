import { getServerAuthSession } from "~/server/auth";
import Navbar from "../components/Navbar";
import { api } from "~/trpc/server";
import CampaignCard from "../components/CampaignCard";
import Image from "next/image";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";
import Link from "next/link";

const Campaigns = async () => {
  const session = await getServerAuthSession();
  const campaigns = await api.campaign.getAllWithTotalDonations();
  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />
      <div className="mx-auto my-10 flex max-w-6xl flex-col items-center justify-center px-4 sm:my-24">
        {/* grid 3/4 and 1/4 */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {/* <div className="flex flex-col self-start"> */}
          <div className="flex flex-col  space-y-4">
            <p className="mt-8 text-left text-left text-2xl font-semibold sm:text-5xl">
              Bersama Kita Bisa: Wujudkan Mimpi Bersama Melalui Donasi
            </p>
            <p className="mt-2 text-left text-gray-500 sm:text-2xl">
              Pilih program donasi yang Anda pedulikan dan berikan kontribusi
              Anda sekarang.
            </p>
          </div>
          <Image
            src="/hero-4.webp"
            // src="/hero-bg-3.jpg"
            width={400}
            height={400}
            className="h-full rounded-xl object-cover sm:ml-8 sm:h-96 sm:w-full sm:rounded-2xl"
            alt="hero"
          />
        </div>
        <Divider sx={{ marginY: 12, width: "100%" }} />
        <p className="self-start text-2xl font-semibold">Program Donasi</p>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Link key={campaign.id} href={`/campaigns/${campaign.url}`}>
              <CampaignCard key={campaign.id} campaign={campaign} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Campaigns;
