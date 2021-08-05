import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ReadingBook from "./pages/ReadingBook/ReadingBook";
import FinishedBook from "./pages/FinishedBook/FinishedBook";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditReadingBook from "./pages/EditReadingBook/EditReadingBook";
import AddReadingBook from "./pages/AddReadingBook/AddReadingBook";
import EditFinishedBook from "./pages/EditFinishedBook/EditFinishedBook";
import AddFinishedBook from "./pages/AddFinishedBook/AddFinishedBook";

function App() {
	return (
		<div className="wrapper">
			<h1>Kazi's Library</h1>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route path="/readingbooks/:id" component={ReadingBook} />
				<Route path="/finishedbooks/:id" component={FinishedBook} />
				<ProtectedRoute exact path="/dashboard" component={Dashboard} />
				<ProtectedRoute
					path="/dashboard/readingbooks/edit/:id"
					component={EditReadingBook}
				/>
				<ProtectedRoute
					path="/dashboard/readingbooks/add"
					component={AddReadingBook}
				/>
				<ProtectedRoute
					path="/dashboard/finishedbooks/edit/:id"
					component={EditFinishedBook}
				/>
				<ProtectedRoute
					path="/dashboard/finishedbooks/add"
					component={AddFinishedBook}
				/>
			</BrowserRouter>
		</div>
	);
}

export default App;
