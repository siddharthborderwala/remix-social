import React from "react";
import { Form } from "@remix-run/react";
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
    <Form
      action={action}
      method={method}
      className="flex flex-col gap-4 mb-4 prose"
    >
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          defaultValue={fields?.title}
          placeholder="Title of your post"
          type="text"
          name="title"
        />
        {error?.fieldErrors?.title && (
          <p className="text-red-500">{error.fieldErrors.title}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="body">Body</label>
        <textarea
          defaultValue={fields?.body}
          name="body"
          id="body"
          placeholder="Write something amazing!"
        ></textarea>
        {error?.fieldErrors?.body && (
          <p className="text-red-500">{error.fieldErrors.body}</p>
        )}
      </div>
      {error?.formErrors.length ? (
        <p className="text-red-500">{error.formErrors}</p>
      ) : null}
      <button
        type="submit"
        className="transition rounded text-white bg-indigo-500 p-2"
      >
        Create Post
      </button>
    </Form>
  );
};

export default PostForm;
