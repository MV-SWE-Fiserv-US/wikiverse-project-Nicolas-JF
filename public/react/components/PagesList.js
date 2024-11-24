import React from 'react';
import { Page } from './Page';

export const PagesList = ({ pages, onArticleClick, onDelete }) => {
  return (
    <>
      {pages.map((page, idx) => (
        <div key={idx} onClick={() => onArticleClick(page.slug)}>
          <Page page={page} onDelete={onDelete} />
        </div>
      ))}
    </>
  );
};
