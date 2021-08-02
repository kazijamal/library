import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import FinishedBook from "./pages/FinishedBook/FinishedBook";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditFinishedBook from "./pages/EditFinishedBook/EditFinishedBook";

function App() {
	return (
		<div className="wrapper">
			<h1>Library</h1>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route path="/finishedbooks/:id" component={FinishedBook} />
				<ProtectedRoute exact path="/dashboard" component={Dashboard} />
				<ProtectedRoute
					path="/dashboard/finishedbooks/edit/:id"
					component={EditFinishedBook}
				/>
			</BrowserRouter>
		</div>
	);
}

export default App;
