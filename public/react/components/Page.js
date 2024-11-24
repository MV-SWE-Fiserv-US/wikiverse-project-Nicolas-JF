import React from 'react';

export const Page = (props) => {
  const { page, onDelete } = props;

  return (
    <>
      <h3>{page.title}</h3>
      <p><strong>Author:</strong> {page.name} ({page.email})</p>
      <p><strong>Content:</strong> {page.content}</p>
      <p><strong>Tags:</strong> {page.tags}</p>
      <p><strong>Created At:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
      <button onClick={() => onDelete(page.slug)}>Delete</button>
    </>
  );
}
