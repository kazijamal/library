import RandomHighlights from "../components/RandomHighlights";
import SearchHighlightsForm from "../components/SearchHighlightsForm";
import ReadingBookList from "../components/ReadingBookList";
import FinishedBookList from "../components/FinishedBookList";

function Home() {
  return (
    <div>
      <RandomHighlights />
      <SearchHighlightsForm />
      <ReadingBookList dashboard={false} />
      <FinishedBookList dashboard={false} />
    </div>
  );
}

export default Home;
