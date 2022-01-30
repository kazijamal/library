import RandomHighlights from '../components/Home/RandomHighlights';
import ReadingBookList from '../components/Home/ReadingBookList';
import FinishedBookList from '../components/Home/FinishedBookList';

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
