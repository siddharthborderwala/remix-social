import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { typeToFlattenedError } from "zod";
import type { Post } from "~/services/posts.server";
import { createPost } from "~/services/posts.server";
import { getPosts } from "~/services/posts.server";
import PostComponent from "~/components/post";
import PostForm from "~/components/post-form";
import { vCreatePost } from "~/services/validations";

type LoaderData = {
  posts: Post[];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() };
  return json(data);
};

type ActionData = {
  error: typeToFlattenedError<Pick<Post, "body" | "title">>;
  fields: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawTitle = form.get("title");
  const rawBody = form.get("body");
  const result = vCreatePost.safeParse({ title: rawTitle, body: rawBody });

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      400
    );
  }

  await createPost({
    title: result.data.title as string | null,
    body: result.data.body,
  });

  return redirect("/");
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();

  return (
    <div className="w-96">
      <h1>Welcome</h1>
      <PostForm
        method="post"
        action="/?index"
        error={formData?.error}
        fields={formData?.fields}
      />
      <ul>
        {posts.map(({ title, body }) => (
          <li key={body}>
            <PostComponent title={title}>
              <p>{body}</p>
            </PostComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
