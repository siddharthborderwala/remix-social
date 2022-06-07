import { Link } from "@remix-run/react";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-w-5xl mx-auto">
      <Link to="/">
        <h1 className="text-slate-800 font-bold text-3xl ">Post Social</h1>
      </Link>
      <ul className="flex space-x-2">
        <li>
          <Link
            to="/login"
            className="rounded-md text-indigo-500 px-6 py-1 border border-indigo-500 inline-block focus:outline-none focus:ring shadow"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="rounded-md text-white bg-indigo-500 px-6 py-1 border border-indigo-500 inline-block focus:outline-none focus:ring shadow"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
