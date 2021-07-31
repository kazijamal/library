import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

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
