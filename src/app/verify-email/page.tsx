"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const VerifyEmail = () => {
  const verifyMutation = api.user.verifyEmail.useMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    verifyMutation.mutate(token);
  }, [token]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto my-8 flex max-w-6xl flex-col items-center justify-center px-4 md:my-32">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Image
            src={verifyMutation.error ? "/sad-emoji.svg" : "/blue-heart.png"}
            width={verifyMutation.error ? 200 : 300}
            height={verifyMutation.error ? 200 : 300}
            alt="blue-heart"
            className="rounded-xl object-cover"
          />

          {!verifyMutation.error && !verifyMutation.data && (
            <p className="text-2xl font-semibold ">Memverifikasi email...</p>
          )}

          {verifyMutation.error && (
            <p className="text-2xl font-semibold ">Gagal memverifikasi email</p>
          )}

          {verifyMutation.data && (
            <p className="text-2xl font-semibold ">
              Berhasil memverifikasi email
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default VerifyEmail;
