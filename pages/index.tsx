import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import SearchPage from "./search";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Athena: Data &rarr; Insights</title>
        <meta
          name="description"
          content="Athena is an application that turns your raw data into powerful rich insights"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="h-32 bg-black flex items-center flex-col">
          <div className="text-white text-xl text-center">
            {" "}
            <span className="text-3xl font-bold">welcome</span>
            <br />
            to athena
          </div>
          <div className="text-white flex mt-4">
            <p>powered by OpenAI</p>
            <Image
              alt="azs icon"
              src="/azs.png"
              style={{ objectFit: "contain" }}
              width={50}
              height={30}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <div className="flex items-center justify-center rounded-lg -mt-4 p-3 bg-white shadow-md w-3/5">
            <MagnifyingGlassIcon width={20} className="text-gray-500" />
            <input
              type="text"
              className="bg-[#FFFFFFCC] focus:outline-0 w-full px-1"
              placeholder={"Type a search query"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
