import React, { useState, useEffect } from 'react';
import PagesList from './PagesList';
import { Page } from './Page';

function App() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  useEffect(() => {
    fetch('/wiki')
      .then((response) => response.json())
      .then((data) => setPages(data));
  }, []);

  const handleArticleClick = (slug) => {
    fetch(`/wiki/${slug}`)
      .then((response) => response.json())
      .then((data) => setSelectedPage(data));
  };

  const handleBackToList = () => {
    setSelectedPage(null);
  };

  const handleAddArticle = (articleData) => {
    fetch('/wiki', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })
      .then((response) => response.json())
      .then(() => {
        // Refetch the articles after adding a new one
        fetch('/wiki')
          .then((response) => response.json())
          .then((data) => setPages(data));
        setIsAddingArticle(false); // Hide the form
      });
  };

  // Handle deleting an article
  const handleDeleteArticle = (slug) => {
    fetch(`/wiki/${slug}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetch('/wiki')
          .then((response) => response.json())
          .then((data) => setPages(data));
        setSelectedPage(null);
      });
  };

  return (
    <div>
      <h1>Wiki App</h1>
      {selectedPage ? (
        <div>
          <Page page={selectedPage} onDelete={handleDeleteArticle} />
          <button onClick={handleBackToList}>Back to Wiki List</button>
        </div>
      ) : isAddingArticle ? (
        <form onSubmit={handleAddArticle}>
          <input type="text" name="title" placeholder="Title" required />
          <textarea name="content" placeholder="Content" required />
          <input type="text" name="name" placeholder="Author Name" required />
          <input type="email" name="email" placeholder="Author Email" required />
          <input type="text" name="tags" placeholder="Tags (space separated)" />
          <button type="submit">Add Article</button>
        </form>
      ) : (
        <PagesList pages={pages} onArticleClick={handleArticleClick} onDelete={handleDeleteArticle} />
      )}
      <button onClick={() => setIsAddingArticle(true)}>Add New Article</button>
    </div>
  );
}

export default App;