import RandomHighlights from "../components/Home/RandomHighlights";
import SearchHighlightsForm from "../components/Home/SearchHighlightsForm";
import ReadingBookList from "../components/Home/ReadingBookList";
import FinishedBookList from "../components/Home/FinishedBookList";

function Home() {
  return (
    <div>
      <RandomHighlights />
      <SearchHighlightsForm />
      <ReadingBookList />
      <FinishedBookList />
    </div>
  );
}

export default Home;
