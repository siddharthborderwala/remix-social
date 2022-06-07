import { db } from "~/services/db.server";
import bcrypt from "bcryptjs";

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
  await db.user.create({
    data: {
      name,
      email,
      hashedPassword: password,
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
