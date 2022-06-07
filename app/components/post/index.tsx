import React from 'react'

type PostProps = {
  title: string | null,
}

const Post: React.FC<PostProps> = ({ title, children }) => {
  return (
    <article className="prose flex flex-col p-6 max-w-md border rounded">
      <h2>{title ?? 'Title'}</h2>
      {children}
    </article>
  )
}

export default Post;
