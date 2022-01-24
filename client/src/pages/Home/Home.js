import React from 'react';
import RandomHighlights from '../../components/Home/RandomHighlights/RandomHighlights';
import ReadingBookList from '../../components/Home/ReadingBookList/ReadingBookList';
import FinishedBookList from '../../components/Home/FinishedBookList/FinishedBookList';

function Home() {
  return (
    <div>
      <RandomHighlights />
      <ReadingBookList />
      <FinishedBookList />
    </div>
  );
}

export default Home;
