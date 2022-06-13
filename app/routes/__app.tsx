import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Nav from "~/components/nav";
import type { SessionUser } from "~/services/auth.server";
import { authenticator } from "~/services/auth.server";

type LoaderData = { user: SessionUser };

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
};

export default function App() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <Nav user={loaderData.user} />
      <Outlet />
    </div>
  );
}
