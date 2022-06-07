import React from "react";
import type { Post } from "@prisma/client";
import type { typeToFlattenedError } from "zod";

type PostFormProps = {
  method: "post" | "put";
  action: string;
  error?: typeToFlattenedError<Pick<Post, "body" | "title">>;
  fields?: {
    title?: string;
    body?: string;
  };
};

const PostForm: React.FC<PostFormProps> = ({
  method,
  action,
  error,
  fields,
}) => {
  return (
    <form
      action={action}
      method={method}
      className="flex flex-col gap-4 pt-4 sticky top-0"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="font-medium">
          Title
        </label>
        <input
          defaultValue={fields?.title}
          placeholder="Title of your post"
          type="text"
          name="title"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring mt-2"
        />
        {error?.fieldErrors?.title && (
          <p className="text-red-500 mt-2">{error.fieldErrors.title}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="body" className="font-medium">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          name="body"
          id="body"
          placeholder="Write something amazing!"
          className="px-2 border rounded-md shadow focus:outline-none focus:ring mt-2"
        ></textarea>
        {error?.fieldErrors?.body && (
          <p className="text-red-500 mt-2">{error.fieldErrors.body}</p>
        )}
      </div>
      <button
        type="submit"
        className="transition rounded-md text-white bg-indigo-500 px-2 py-1 mt-2 shadow hover:shadow-md active:shadow-sm focus:outline-none focus:ring"
      >
        Create Post
      </button>
      {error?.formErrors?.map((e) => (
        <p key={e} className="text-red-500 mt-2">
          {e}
        </p>
      ))}
    </form>
  );
};

export default PostForm;
