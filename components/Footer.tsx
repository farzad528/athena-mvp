import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="bg-gray-100 px-4 flex w-full flex-col items-center justify-between gap-2">
      <div>
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline-offset-2 transition hover:text-slate-500 hover:underline"
        >
          OpenAI{" "}
        </a>
        and{" "}
        <a
          href="https://learn.microsoft.com/en-us/azure/search/"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline-offset-2 transition hover:text-slate-500 hover:underline"
        >
          Azure Cognitive Search
        </a>
      </div>
      <div>
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <a
            href="https:atheros.tech"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline-offset-2 transition hover:text-slate-500 hover:underline"
          >
            Atheros LLC
          </a>
          {""}. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
