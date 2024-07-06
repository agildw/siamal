import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Footer from "~/app/components/Footer";
import Navbar from "~/app/components/Navbar";
import StatusChip from "~/app/components/StatusChip";
import { handleAmount } from "~/app/utils/util";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const DonationDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await getServerAuthSession();
  const donation = await api.donation.get(id);

  if (!donation) {
    redirect("/donations");
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />

      <div className="mx-auto my-8 flex max-w-2xl flex-col items-center justify-center px-4 md:my-24">
        <p className="mb-4 self-start text-lg font-semibold">
          Donasi <span className="text-blue-700">#{donation.id}</span>
        </p>
        <div className="mb-8 flex flex-row items-center justify-center space-x-4">
          <Image
            src={donation.campaign.thumbnail}
            width={200}
            height={200}
            alt="blue-heart"
            className="rounded-xl object-cover"
          />
          <div className="flex flex-col items-start justify-start space-y-2 text-start">
            <p className="text-base font-semibold">{donation.campaign.title}</p>
            <Link href={`/campaigns/${donation.campaign.url}`}>
              <button
                type="button"
                className=" rounded-lg bg-blue-700 px-2 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Donasi Lagi
              </button>
            </Link>
          </div>
        </div>
        <div className="flex grid w-full grid-cols-2 gap-4 rounded-xl border border-gray-200 p-4 hover:bg-gray-100">
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-base">Tanggal</p>
            <p className="text-base">Metode Pembayaran</p>
            <p className="text-base">Status</p>
            <p className="text-base">Nominal</p>
          </div>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-base font-semibold">
              {moment(donation.createdAt).format("DD MMMM YYYY")}
            </p>
            <p className="text-base font-semibold">
              {donation.paymentMethod ?? "-"}
            </p>

            <StatusChip status={donation.status} />

            <p className="text-base font-semibold">
              Rp{handleAmount(donation.amount)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DonationDetail;
