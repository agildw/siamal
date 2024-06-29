import Image from "next/image";

const Login = () => {
  return (
    <>
      <div className="bg-white">
        <div className="flex h-screen justify-center">
          <div
            className="hidden bg-blue-400 bg-cover lg:block lg:w-2/3"
            // style={{
            //   backgroundImage: "url('/hero-bg.jpg')",
            // }}
          >
            {/* <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20"> */}
            <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
              <div>
                <h2 className="text-4xl font-bold text-white">Siamal</h2>
                <p className="mt-3 max-w-xl text-xl text-gray-100">
                  Mari lanjutkan perjuangan kita. Bersama Siamal, setiap langkah
                  kecil Anda menciptakan perubahan besar bagi mereka yang
                  membutuhkan.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
            <div className="flex-1">
              <div className="flex flex-col items-center">
                {/* <h2 className="text-center text-4xl font-bold text-gray-700">
                  Siamal
                </h2> */}
                <Image
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="Logo"
                  className="rounded-lg"
                />
                <p className="mt-3 text-gray-500">
                  Sign in to access your account
                </p>
              </div>
              <div className="mt-8">
                <form>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600 "
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-40    "
                    />
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 flex justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-40    "
                    />
                  </div>
                  <div className="mt-6">
                    <button className="w-full transform rounded-md bg-blue-600 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-500 hover:underline focus:underline focus:outline-none"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
