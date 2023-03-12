import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./pages/Layout";
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
      <Routes>
        <Route path="/" element={<Layout />}>
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
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
