import Link from "next/link";
import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Router from "next/router";

type Props = {
  isAuthenticated: boolean;
};

function Header({}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const returnHome = () => {
    Router.push("/");
  };
  return (
    <>
      <header
        className="flex justify-between items-center px-10 py-4 shadow-lg cursor-pointer"
        onClick={returnHome}
      >
        {/* Logo */}
        <div className="flex gap-1">
          <h1 className="flex-none uppercase font-bold text-2xl">Athena</h1>
          <div className="uppercase text-sm text-start">beta</div>
        </div>

        <nav className="flex-1 text-lg">
          <ul className="flex justify-center gap-10">
            <li className="transition duration-300 ease-out hover:ease-in hover:text-blue-600">
              <Link href="/">Home</Link>
            </li>
            <li className="transition duration-300 ease-out hover:ease-in hover:text-blue-600">
              <Link href="/searchPage">Search</Link>
            </li>
            <li className="transition duration-300 ease-out hover:ease-in hover:text-blue-600">
              <Link href="/tipsPage">Tips</Link>
            </li>
          </ul>
        </nav>
        {/* Login or AVATAR */}
        {/* <UserCircleIcon width={40} /> */}
        {!isAuthenticated ? (
          <button
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white w-36 transition duration-300 ease-out hover:ease-in hover:bg-blue-600"
            onClick={() => setIsAuthenticated(true)}
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <UserCircleIcon width={40} className="" />
            <p>Welcome, Farzad</p>
          </div>
        )}
      </header>
      <div className="bg-zinc-800 h-10"></div>
    </>
  );
}

export default Header;
