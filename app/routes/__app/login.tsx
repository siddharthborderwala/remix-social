import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import LoginForm from "~/components/login-form";
import { authenticator, USER_LOGIN } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: "/",
    throwOnError: true,
    failureRedirect: "/login",
  });
};

type LoaderData = {
  error?: { formErrors: string[] };
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { successRedirect: "/" });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey) as Error[] | Error;

  if (error) {
    return json(
      {
        error: {
          formErrors: ["Unable to login with those credentials"],
        },
      },
      401
    );
  } else {
    return {};
  }
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div className="p-8 max-w-sm mx-auto">
      <main>
        <h1 className="font-bold text-gray-900 text-2xl mb-4">Login</h1>
        <LoginForm action="/login" error={loaderData.error} />
      </main>
    </div>
  );
}
