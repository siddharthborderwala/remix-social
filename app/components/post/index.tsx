import React from "react";

type PostProps = {
  title: string;
  body: string;
  authorName: string;
};

const Post: React.FC<PostProps> = ({ title, body, authorName }) => {
  return (
    <article className="flex flex-col p-6 border rounded shadow">
      <h2 className="text-gray-900 font-bold text-xl">{title}</h2>
      <p className="text-gray-600 italic mt-2">by {authorName}</p>
      <p className="mt-4 text-md text-gray-900 text-ellipsis">{body}</p>
    </article>
  );
};

export default Post;
