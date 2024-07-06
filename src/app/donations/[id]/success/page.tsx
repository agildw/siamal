import Image from "next/image";
import { redirect } from "next/navigation";
import Footer from "~/app/components/Footer";
import Navbar from "~/app/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const DonationSuccess = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await getServerAuthSession();
  const donation = await api.donation.get(id);

  if (!donation) {
    redirect("/donations");
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar user={session?.user} />
      <div className="mx-auto my-8 flex max-w-6xl flex-col items-center justify-center px-4 md:my-24">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Image
            src="/blue-heart.png"
            width={400}
            height={400}
            alt="blue-heart"
            className="rounded-xl object-cover"
          />
          <p className="text-2xl font-semibold">
            Terima Kasih, {session?.user.name}
          </p>
          <p className="text-gray-500">
            Kebaikan hati Anda memberikan harapan baru bagi mereka yang
            membutuhkan. Terima kasih telah berbagi kebaikan bersama Siamal.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DonationSuccess;
