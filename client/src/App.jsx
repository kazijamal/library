import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReadingBook from "./pages/ReadingBook";
import FinishedBook from "./pages/FinishedBook";
import AlreadyAuth from "./components/AlreadyAuth";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import EditReadingBook from "./pages/EditReadingBook";
import AddReadingBook from "./pages/AddReadingBook";
import EditFinishedBook from "./pages/EditFinishedBook";
import AddFinishedBook from "./pages/AddFinishedBook";
import NotFound from "./pages/NotFound";
import SearchHighlightsResults from "./pages/SearchHighlightsResults";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow fixed inset-0 overflow-auto bg-neutral-50 dark:bg-neutral-900">
        <div className="m-auto max-w-6xl p-5 dark:text-neutral-100">
          <Navbar />
          <Router>
            <Routes>
              <Route element={<AlreadyAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/readingbooks/:id" element={<ReadingBook />} />
              <Route path="/finishedbooks/:id" element={<FinishedBook />} />
              <Route
                path="/highlights/search"
                element={<SearchHighlightsResults />}
              />
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/readingbooks/edit/:id"
                  element={<EditReadingBook />}
                />
                <Route
                  path="/dashboard/readingbooks/add"
                  element={<AddReadingBook />}
                />
                <Route
                  path="/dashboard/finishedbooks/edit/:id"
                  element={<EditFinishedBook />}
                />
                <Route
                  path="/dashboard/finishedbooks/add"
                  element={<AddFinishedBook />}
                />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
