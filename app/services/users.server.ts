import { db } from "~/services/db.server";
import bcrypt from "bcryptjs";
export type { User } from "@prisma/client";

export type SignupInputType = {
  name: string;
  email: string;
  password: string;
};

export const signupUser = async ({
  name,
  email,
  password,
}: SignupInputType) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const checkUserExistsByEmail = async (email: string) =>
  (await db.user.count({ where: { email } })) > 0;

export const loginUser = async (email: string, password: string) => {
  const user = await db.user.findFirst({ where: { email } });
  if (!user) throw new Error("User not found");

  let res = false;
  try {
    res = await bcrypt.compare(password, user.hashedPassword);
  } catch {
    throw new Error("Email and password combination does not exist.");
  }

  if (!res) {
    throw new Error("Email and password combination does not exist.");
  }

  const { hashedPassword, ...sessionStorage } = user;

  return sessionStorage;
};
