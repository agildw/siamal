import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import CampaignCard from "./components/CampaignCard";
import { Divider } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { handleStatisticalAmount } from "./utils/util";

export default async function Home() {
  const session = await getServerAuthSession();

  const donations = await api.campaign.getLatestWithTotalDonations();
  const campaignCount = await api.campaign.count();
  const donationCount = await api.donation.count();
  const totalFund = await api.donation.countTotalFunds();
  const userCount = await api.user.count();

  // redirect("/dashboard");
  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />
      <section className="my-16 bg-white pt-10">
        <div className="mx-auto max-w-7xl px-12">
          <div className="mx-auto w-full text-left md:w-11/12 md:text-center xl:w-9/12">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              Jadilah Pahlawan bagi Mereka yang Membutuhkan
            </h1>
            <p className="mb-8 px-0 text-lg text-gray-600 md:text-xl lg:px-24">
              Wujudkan perubahan nyata dengan donasi Anda. Platform kami
              menyediakan cara mudah dan aman untuk membantu sesama.
            </p>
            <div className="mb-4 space-x-0 md:mb-8 md:space-x-2">
              <Link
                href="/campaigns"
                className="mb-2 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-lg text-white sm:mb-0 sm:w-auto"
              >
                Donasi Sekarang
                <svg
                  className="ml-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-20 w-full text-center md:w-10/12">
            <div className="relative z-0 mt-8 w-full">
              <div className="relative overflow-hidden shadow-2xl">
                <Image
                  src="/hero-bg.jpg"
                  alt="hero"
                  width={1200}
                  height={800}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-28 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center justify-start space-y-1">
              <p className="text-lg font-semibold text-blue-800 sm:text-2xl lg:text-5xl">
                Rp{handleStatisticalAmount(totalFund ?? 0)}+
              </p>
              <p className="text-md text-gray-600 sm:text-xl lg:text-2xl">
                Dana Terkumpul
              </p>
            </div>

            <div className="flex flex-col items-center justify-start space-y-1">
              <p className="text-lg font-semibold text-blue-800 sm:text-2xl lg:text-5xl">
                {handleStatisticalAmount(donationCount)}+
              </p>
              <p className="text-md text-gray-600 sm:text-xl lg:text-2xl">
                Total Donasi
              </p>
            </div>

            <div className="flex flex-col items-center justify-start space-y-1">
              <p className="text-lg font-semibold text-blue-800 sm:text-2xl lg:text-5xl">
                {handleStatisticalAmount(campaignCount)}+
              </p>
              <p className="text-md text-gray-600 sm:text-xl lg:text-2xl">
                Campaign
              </p>
            </div>
            <div className="flex flex-col items-center justify-start space-y-1">
              <p className="text-lg font-semibold text-blue-800 sm:text-2xl lg:text-5xl">
                {handleStatisticalAmount(userCount)}+
              </p>
              <p className="text-md text-gray-600 sm:text-xl lg:text-2xl">
                Donatur
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8">
          <p className="text-center text-3xl font-semibold text-gray-800">
            Kampanye Terbaru Kami
          </p>
          <Divider
            className="mx-auto w-24 "
            sx={{ borderBottomWidth: 2, borderColor: "blue" }}
          />
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-12 sm:grid-cols-2 lg:grid-cols-3">
          {donations.map((campaign) => (
            <Link href={`/campaigns/${campaign.url}`} key={campaign.id}>
              <CampaignCard key={campaign.id} campaign={campaign} />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
