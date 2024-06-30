import Link from "next/link";

import {getServerAuthSession} from "~/server/auth";
import {api} from "~/trpc/server";
import {redirect} from "next/navigation";
import Image from "next/image";

export default async function Home() {
    const session = await getServerAuthSession();

    // redirect("/dashboard");
    return (
        <main className="bg-white min-h-screen">
            <nav className="bg-white border-gray-200 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://siamal.turu.dev" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={"/logo.png"} alt="logo" width={40} height={40} className="rounded-lg"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-gray-700">Siamal</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="tel:5541251234" className="text-sm  text-gray-500  hover:underline">(555)
                            412-1234</a>
                        <a href="#" className="text-sm  text-blue-600  hover:underline">Login</a>
                    </div>
                </div>
            </nav>
            <section className="pt-10 bg-white my-16">
                <div className="px-12 mx-auto max-w-7xl">
                    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                            Jadilah Pahlawan bagi Mereka yang Membutuhkan
                        </h1>
                        <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                            Wujudkan perubahan nyata dengan donasi Anda. Platform kami menyediakan cara mudah dan aman
                            untuk membantu sesama.
                        </p>
                        <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-600 rounded-2xl sm:w-auto sm:mb-0"
                            >
                                Donasi Sekarang
                                <svg
                                    className="w-4 h-4 ml-1"
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
                            </a>
                            <a
                                href="#_"
                                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0"
                            >
                                Pelajari Lebih Lanjut
                                <svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                        <div className="relative z-0 w-full mt-8">
                            <div className="relative overflow-hidden shadow-2xl">
                                <Image src="/hero-bg.jpg" alt="hero" width={1200} height={800} className="rounded-xl"/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-28 mx-auto">
                        <div className="flex flex-col justify-start space-y-1 items-center">
                            <p className="text-lg sm:text-2xl lg:text-5xl font-semibold text-blue-800">Rp500M+</p>
                            <p className="text-md sm:text-xl lg:text-2xl text-gray-600">Dana Terkumpul</p>
                        </div>

                        <div className="flex flex-col justify-start space-y-1 items-center">
                            <p className="text-lg sm:text-2xl lg:text-5xl font-semibold text-blue-800">10K+</p>
                            <p className="text-md sm:text-xl lg:text-2xl text-gray-600">Total Donasi</p>
                        </div>

                        <div className="flex flex-col justify-start space-y-1 items-center">
                            <p className="text-lg sm:text-2xl lg:text-5xl font-semibold text-blue-800">100+</p>
                            <p className="text-md sm:text-xl lg:text-2xl text-gray-600">Campaign</p>
                        </div>
                        <div className="flex flex-col justify-start space-y-1 items-center">
                            <p className="text-lg sm:text-2xl lg:text-5xl font-semibold text-blue-800">1000+</p>
                            <p className="text-md sm:text-xl lg:text-2xl text-gray-600">Donatur</p>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className="p-16 bg-blue-500 text-gray-100 justify-start items-start">*/}
            {/*    <h3 className="text-4xl font-semibold text-center max-w-xl mx-auto">Berdonasi di Siamal hanya memakan waktu beberapa menit</h3>*/}
            {/*    <div className="grid grid-cols-3 gap-4 mt-16 mx-auto">*/}

            {/*    </div>*/}

            {/*</section>*/}
            <section className="p-16 bg-gray-100 text-gray-800 grid grid-cols-2 justify-center items-center gap-8">
                <div className="flex flex-col">
                <Image src="/logo.png" alt="Logo"  width={280} height={280} className="rounded-xl self-end"/>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm">Who we are</p>
                    <p className="text-2xl font-semibold">Siamal</p>
                    <p className="text-sm">We are a non-profit organization that helps people in need</p>

                </div>
            </section>
        </main>
    );
}
