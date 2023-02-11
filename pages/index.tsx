import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import SearchPage from "./searchPage";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface SearchCaptions {
  text: string;
  highlights: string;
}

interface SearchResult {
  "@search.score": number;
  "@search.rerankerScore": number;
  "@search.captions": SearchCaptions[];
  // TODO: Add all your fields to your typescript interface
  id: string;
  title_en_lucene?: string;
  text_en_lucene?: string;
}

interface SearchResultAnswer {
  key: number;
  text: string;
  highlights: string;
  score: number;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsAnswers, setSearchResultsAnswers] = useState([]);

  const search = searchQuery;

  const handleClear = () => {
    setSearchQuery("");
  };

  const getSearchResults = async (e: any) => {
    e.preventDefault();
    setSearchResults([]);
    setLoading(true);
    setCount(0);

    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.API_KEY ?? ""}`,
      },
      body: JSON.stringify({
        search,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let results = await response.json();
    console.log(results);
    setLoading(false);
    setCount(results["@odata.count"]);
    setSearchResults(results.value);
    setSearchResultsAnswers(results["@search.answers"]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchQuery || searchQuery.trim() === "" || searchQuery === "*") {
        alert("Please type something");
        return;
      }
      getSearchResults(e);
    }
  };

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
      <main className="bg-gray-100  h-screen">
        <div className="h-32 bg-black flex items-center flex-col">
          <div className="text-white text-xl text-center">
            {" "}
            <span className="text-3xl font-bold">welcome</span>
            <br />
            to athena
          </div>
          <div className="text-white flex mt-4">
            <p>powered by azure cognitive search</p>
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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <XCircleIcon
                width={20}
                className="text-gray-500"
                onClick={handleClear}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center px-10 py-4 pt-3">
          <div className="">placeholder</div>
          <div className="text-gray-500">
            showing {count} {count === 1 ? "result" : "results"} for&nbsp;
            <span className="font-bold text-xl">what is a noob</span>
          </div>
          <div className="flex">sort by XXX</div>
        </div>
      </main>
    </>
  );
}
