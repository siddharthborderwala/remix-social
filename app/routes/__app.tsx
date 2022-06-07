import { Outlet } from "@remix-run/react";
import Nav from "~/components/nav";

export default function App() {
  return (
    <div className="w-full">
      <Nav />
      <Outlet />
    </div>
  );
}
