import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <h1>this is athena</h1>
      </main>
    </>
  );
}
