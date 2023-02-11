import Link from "next/link";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <header className="flex justify-between items-center px-10 py-4 shadow-lg">
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
              <Link href="/search">Search</Link>
            </li>
            <li className="transition duration-300 ease-out hover:ease-in hover:text-blue-600">
              <Link href="/tips">Tips</Link>
            </li>
          </ul>
        </nav>
        {/* Login or AVATAR */}
        {/* <UserCircleIcon width={40} /> */}
        <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white w-36 transition duration-300 ease-out hover:ease-in hover:bg-blue-600">
          Sign In
        </button>
      </header>
      <div className="bg-zinc-800 h-10"></div>
    </>
  );
};

export default Header;
