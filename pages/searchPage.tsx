import Header from "@/components/Header";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { count } from "console";
import Image from "next/image";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { XCircleIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function SearchPage({}: Props) {
  const [loading, setLoading] = useState(false);
  const [promptRequest, setPromptRequest] = useState("");
  const [generatedAnswers, setGeneratedAnswers] = useState<String>("");

  interface GeneratedAnswer {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
  }

  interface Choice {
    text: string;
    index: number;
    finish_reason: string;
    logprobs: any;
  }

  interface Usage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }

  const prompt = promptRequest;

  console.log("Streamed response: ", generatedAnswers);

  const handleClear = () => {
    setPromptRequest("");
  };

  const getGeneratedAnswers = async (e: any) => {
    e.preventDefault();
    setGeneratedAnswers("");
    setLoading(true);
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedAnswers((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        !promptRequest ||
        promptRequest.trim() === "" ||
        promptRequest === "*"
      ) {
        alert("Please type something");
        return;
      }
      getGeneratedAnswers(e);
    }
  };

  return (
    <>
      <Header isAuthenticated={false} />
      <main className="bg-gray-100">
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
              src="/oai.png"
              style={{ objectFit: "contain" }}
              width={20}
              height={20}
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
              value={promptRequest}
              onChange={(event) => setPromptRequest(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            {promptRequest && (
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
            showing results for&nbsp;
            <span className="font-bold text-xl">{promptRequest}</span>
          </div>

          <div className="flex">sort by XXX</div>
        </div>
        <div className="flex items-center justify-center">
          {loading && <BeatLoader color="#000" />}
        </div>
        <div>
          {!loading && (
            <div className="mx-30">
              {generatedAnswers && (
                <div className="mx-10">
                  <h2>ChatGPT response:</h2>
                  <div>
                    <div className="bg-white shadow-md rounded-xl py-2 px-6 mt-2">
                      <p>{generatedAnswers}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
