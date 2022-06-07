import type { FormProps } from "@remix-run/react";
import { Form, useTransition } from "@remix-run/react";
import React from "react";
import type { typeToFlattenedError } from "zod";

type RegisterFormProps = FormProps & {
  action: string;
  error?: typeToFlattenedError<{
    name: string;
    email: string;
    password: string;
  }>;
  fields?: {
    name?: string;
    email?: string;
    password?: string;
  };
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  action,
  error,
  fields,
}) => {
  const transition = useTransition();

  return (
    <Form method="post" action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="mb-2 text-slate-700 font-medium">
          Name
        </label>
        <input
          defaultValue={fields?.name}
          type="text"
          name="name"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring p-1"
          autoComplete="off"
          required
        />
        {error?.fieldErrors.name && (
          <p className="text-red-500 mt-2">{error.fieldErrors.name}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="mb-2 text-slate-700 font-medium">
          Email
        </label>
        <input
          defaultValue={fields?.email}
          type="email"
          name="email"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring p-1"
          autoComplete="user-name"
          required
        />
        {error?.fieldErrors.email && (
          <p className="text-red-500 mt-2">{error.fieldErrors.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="mb-2 text-slate-700 font-medium">
          Password
        </label>
        <input
          defaultValue={fields?.password}
          type="password"
          name="password"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring p-1"
          autoComplete="current-password"
          required
        />
        {error?.fieldErrors.password && (
          <p className="text-red-500 mt-2">
            {error.fieldErrors.password.toString()}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="transition rounded-md text-white bg-indigo-500 px-2 py-1.5 mt-3 shadow hover:shadow-md active:shadow-sm focus:outline-none focus:ring"
        disabled={transition.state !== "idle"}
      >
        {transition.state === "submitting" ? "Submitting..." : "Create Account"}
      </button>
      {error?.formErrors?.map((e) => (
        <p key={e} className="text-red-500 mt-2">
          {e}
        </p>
      ))}
    </Form>
  );
};

export default RegisterForm;
