import type { FormProps } from "@remix-run/react";
import { Form, useTransition } from "@remix-run/react";
import React from "react";

type LoginFormProps = FormProps & {
  action: string;
  error?: {
    formErrors: string[];
  };
};

const LoginForm: React.FC<LoginFormProps> = ({ action, error }) => {
  const transition = useTransition();

  return (
    <Form method="post" action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="mb-2 text-slate-700 font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring p-1"
          autoComplete="user-name"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="mb-2 text-slate-700 font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring p-1"
          autoComplete="current-password"
          required
        />
      </div>
      <button
        type="submit"
        className="transition rounded-md text-white bg-indigo-500 px-2 py-1.5 mt-3 shadow hover:shadow-md active:shadow-sm focus:outline-none focus:ring"
        disabled={transition.state !== "idle"}
      >
        {transition.state === "submitting" ? "Logging in..." : "Login"}
      </button>
      {error?.formErrors?.map((e) => (
        <p key={e} className="text-red-500 mt-2">
          {e}
        </p>
      ))}
    </Form>
  );
};

export default LoginForm;
