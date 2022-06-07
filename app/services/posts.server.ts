import { db } from "~/services/db.server";
import type { Post } from "@prisma/client";
export type { Post } from "@prisma/client";

export const getPosts = () =>
  db.post.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

export const createPost = ({
  title,
  body,
  userId,
}: Pick<Post, "title" | "body" | "userId">) =>
  db.post.create({ data: { title, body, userId } });
