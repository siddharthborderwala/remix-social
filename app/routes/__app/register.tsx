import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import type { typeToFlattenedError } from "zod";
import RegisterForm from "~/components/register-form";
import type { SignupInputType } from "~/services/users.server";
import { checkUserExistsByEmail } from "~/services/users.server";
import { signupUser } from "~/services/users.server";
import { vUserSignup } from "~/services/validations";
import { authenticator, USER_LOGIN } from "~/services/auth.server";

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

  if (
    typeof rawEmail !== "string" ||
    typeof rawPassword !== "string" ||
    typeof rawName !== "string"
  ) {
    return json(
      {
        error: {
          formError: ["Form not submitted correctly"],
        },
      },
      400
    );
  }

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

  if (await checkUserExistsByEmail(result.data.email)) {
    return json(
      {
        error: {
          formErrors: [
            `User with email ${rawEmail} already exists, please login.`,
          ],
        },
      },
      400
    );
  }

  await signupUser(result.data);

  return await authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: "/",
    throwOnError: true,
    failureRedirect: "/login",
  });
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
