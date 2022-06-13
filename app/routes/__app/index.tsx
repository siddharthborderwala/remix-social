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
import { authenticator } from "~/services/auth.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const posts = await getPosts();
  return json({ posts });
};

type ActionData = {
  error: typeToFlattenedError<Pick<Post, "body" | "title">>;
  fields: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
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
    title: result.data.title,
    body: result.data.body,
    userId: user.id,
  });

  return redirect("/");
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();

  return (
    <div
      className="p-8 grid container mx-auto"
      style={{ gridTemplateColumns: "3fr 1fr" }}
    >
      <main>
        <h1 className="font-bold text-gray-900 text-2xl mb-4">View Posts</h1>
        <div className="space-y-4 flex flex-col pr-8">
          {posts.map(({ id, title, body, user: { name } }) => (
            <PostComponent
              key={id}
              title={title}
              body={body}
              authorName={name}
            />
          ))}
        </div>
      </main>
      <aside>
        <PostForm
          method="post"
          action="/?index"
          error={formData?.error}
          fields={formData?.fields}
        />
      </aside>
    </div>
  );
}
