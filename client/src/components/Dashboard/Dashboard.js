import React from "react";

function Dashboard() {
	const handleLogout = () => {
		localStorage.clear();
		window.location.pathname = "/";
	};
	return (
		<div>
			<h2>Dashboard</h2>
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default Dashboard;
