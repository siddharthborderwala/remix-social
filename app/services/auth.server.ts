import { Authenticator } from "remix-auth";
import type { User } from "~/services/users.server";
import { loginUser } from "~/services/users.server";
import {
  getSession,
  commitSession,
  destroySession,
} from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { vLogin } from "./validations";

export type SessionUser = Omit<User, "hashedPassword">;

export const authenticator = new Authenticator<SessionUser>({
  commitSession,
  destroySession,
  getSession,
});

export const USER_LOGIN = "user-login";

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const rawEmail = form.get("email");
    const rawPassword = form.get("password");

    const { email, password } = vLogin.parse({
      email: rawEmail,
      password: rawPassword,
    });

    return await loginUser(email, password);
  }),
  USER_LOGIN
);
