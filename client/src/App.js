import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Authentication/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
	return (
		<div className="wrapper">
			<h1>Application</h1>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<ProtectedRoute exact path="/dashboard" component={Dashboard} />
			</BrowserRouter>
		</div>
	);
}

export default App;
