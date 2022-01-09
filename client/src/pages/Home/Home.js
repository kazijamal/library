import React from 'react';
import { Link } from 'react-router-dom';
import ReadingBookList from '../../components/Home/ReadingBookList/ReadingBookList';
import FinishedBookList from '../../components/Home/FinishedBookList/FinishedBookList';

function Home() {
  return (
    <div>
      <ReadingBookList />
      <FinishedBookList />
    </div>
  );
}

export default Home;
