import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import bcrypt from "bcryptjs";
import type { ActionFunction } from "@remix-run/node";
import type { typeToFlattenedError } from "zod";
import RegisterForm from "~/components/register-form";
import type { SignupInputType } from "~/services/users.server";
import { signupUser } from "~/services/users.server";
import { vUserSignup } from "~/services/validations";

type ActionData = {
  error: typeToFlattenedError<SignupInputType>;
  fields: {
    name?: string;
    email?: string;
    password?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawName = form.get("name");
  const rawEmail = form.get("email");
  const rawPassword = form.get("password");

  const result = vUserSignup.safeParse({
    name: rawName,
    email: rawEmail,
    password: rawPassword,
  });

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          name: rawName,
          email: rawEmail,
          password: rawPassword,
        },
      },
      400
    );
  }

  const salt: string = await new Promise((resolve, reject) => {
    bcrypt.genSalt(8, function (err, salt) {
      if (err) reject(err);
      resolve(salt);
    });
  });

  const passwordHash: string = await new Promise((resolve, reject) => {
    bcrypt.hash(result.data.password, salt, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  await signupUser({
    ...result.data,
    password: passwordHash,
  });

  return redirect("/");
};

export default function Index() {
  const formData = useActionData<ActionData>();

  return (
    <div className="p-8 max-w-sm mx-auto">
      <main>
        <h1 className="font-bold text-gray-900 text-2xl mb-4">Register</h1>
        <RegisterForm
          action="/register"
          method="post"
          error={formData?.error}
          fields={formData?.fields}
        />
      </main>
    </div>
  );
}
