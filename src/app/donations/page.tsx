import moment from "moment";
import Image from "next/image";
import Navbar from "~/app/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import StatusChip from "../components/StatusChip";
import Link from "next/link";
import Footer from "../components/Footer";
import { handleAmount } from "../utils/util";
import { redirect } from "next/navigation";

const DonationSuccess = async () => {
  const session = await getServerAuthSession();
  if (!session) return redirect("/login");
  const donations = await api.donation.getByUser();

  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />
      <div className="mx-auto my-8 flex max-w-3xl flex-col items-center justify-center px-4 md:my-24">
        <p className="self-start text-2xl font-semibold">Catatan Kebaikan</p>
        <div className="mt-8 flex flex-col items-center justify-center space-y-2 text-center">
          {donations.length === 0 && (
            <p className="text-lg font-semibold text-gray-500">
              Belum ada catatan kebaikan
            </p>
          )}
          {donations.map((donation) => (
            <Link key={donation.id} href={`/donations/${donation.id}`}>
              {/* <div className="flex cursor-pointer flex-row items-center justify-center space-x-4 rounded-xl p-4 text-center hover:bg-gray-100"> */}
              <div className="grid cursor-pointer grid-cols-2 gap-4 rounded-xl p-4 text-center hover:bg-gray-100 md:flex md:flex-row md:items-center md:justify-center md:space-x-4">
                <Image
                  src={donation.campaign.thumbnail}
                  width={200}
                  height={200}
                  alt="blue-heart"
                  className=" rounded-xl object-cover"
                />
                <div className="flex flex-col items-start justify-start space-y-2 text-start">
                  <p className="text-base font-semibold md:text-xl">
                    {donation.campaign.title}
                  </p>
                  <div className="block md:hidden">
                    <StatusChip status={donation.status} />
                  </div>
                  <div className="flex flex-row items-center justify-start space-x-2 text-xs md:text-sm">
                    <p className="text-gray-500">
                      {moment(donation.createdAt).format("DD MMMM YYYY")}
                    </p>
                    <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                    <p className="font-semibold text-gray-500">
                      Rp{handleAmount(donation.amount)}
                    </p>

                    <div className="hidden md:block">
                      <StatusChip status={donation.status} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DonationSuccess;
