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
  posts: Awaited<ReturnType<typeof getPosts>>;
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
    title: result.data.title,
    body: result.data.body,
    userId: "16f25644-90d0-42eb-900b-56a6056435c7",
  });

  return redirect("/");
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();

  return (
    <div className="w-full p-8 grid" style={{ gridTemplateColumns: "3fr 2fr" }}>
      <main>
        <h1 className="font-bold text-gray-900 text-3xl mb-4">View Posts</h1>
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
