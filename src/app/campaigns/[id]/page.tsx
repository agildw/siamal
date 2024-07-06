import { getServerAuthSession } from "~/server/auth";
import Navbar from "../../components/Navbar";
import { api } from "~/trpc/server";
import Image from "next/image";
import Footer from "../../components/Footer";
import Link from "next/link";

import CampaignDescription from "./_components/CampaignDescription";

import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.campaign.getByUrl(params.id);
  const description =
    "Siamal adalah platform donasi dan amal terpercaya yang menghubungkan Anda dengan berbagai program sosial di Indonesia. Bersama kita wujudkan perubahan positif untuk masyarakat.";
  if (!post) {
    return {
      title: "Siamal - Donasi Mudah, Aman, dan Berdampak",
      description,
    };
  }

  return {
    title: post.title,
    description,
  };
}

const CampaignDetails = async ({ params }: Props) => {
  const { id } = params;
  const session = await getServerAuthSession();
  const campaign = await api.campaign.getByUrl(id);

  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />
      <div className="mx-auto my-8 flex max-w-6xl flex-col items-center justify-center px-4 md:my-24">
        {!campaign && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              src="/blue-heart.png"
              width={400}
              height={400}
              alt="404"
              className="rounded-xl object-cover"
            />
            <p className="text-2xl font-semibold">Campaign not found</p>
            <Link href="/campaigns">
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Back to Campaigns
              </button>
            </Link>
          </div>
        )}
        {campaign && <CampaignDescription campaign={campaign} />}
      </div>
      <Footer />
    </main>
  );
};

export default CampaignDetails;
