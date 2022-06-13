import React from "react";
import { Link } from "@remix-run/react";
import type { SessionUser } from "~/services/auth.server";

type NavProps = { user?: SessionUser };

const Nav: React.FC<NavProps> = ({ user }) => (
  <nav className="flex justify-between items-center px-8 py-4 container mx-auto">
    <Link to="/">
      <h1 className="text-slate-800 font-bold text-3xl ">Remix Social</h1>
    </Link>
    <ul className="flex space-x-2">
      {!user ? (
        <>
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
        </>
      ) : (
        <>
          <li>
            <p className="rounded-md text-slate-500 px-6 py-1">{user.email}</p>
          </li>
          <li>
            <form action="/logout" method="post">
              <button className="rounded-md text-slate-500 px-6 py-1 border border-slate-500 inline-block focus:outline-none focus:ring shadow">
                Logout
              </button>
            </form>
          </li>
        </>
      )}
    </ul>
  </nav>
);

export default Nav;
