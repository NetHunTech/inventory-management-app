import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Side */}
        <div className="flex flex-col items-center text-center md:text-left">
          <Image
            src="/icon.png"
            width={500}
            height={300}
            alt="Inventory dashboard"
            className="rounded-2xl order-1 md:order-3 w-52 md:w-auto mb-6 md:mb-0 md:mt-8"
          />

          <h1 className="order-2 md:order-1 text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Inventory Management
          </h1>

          <p className="order-3 md:order-2 text-lg lg:text-xl text-gray-600 max-w-xl">
            Streamline your inventory tracking with our powerful,
            easy-to-use management system. Track products, monitor
            stock levels, and gain valuable insights.
          </p>
        </div>

        {/* Right Side - Login box */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full m-auto">
          <div className="flex flex-col gap-4">
            <Link
              href="/sign-in"
              className="w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="w-full text-center bg-white text-blue-600 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <Link
              href="#"
              className="w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Continue with Google
            </Link>

            <Link
              href="#"
              className="text-center text-blue-600 font-medium mt-2"
            >
              Learn More
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}