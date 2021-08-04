import React from "react";
import { Redirect, Route } from "react-router-dom";
import useToken from "../../utils/useToken";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { token } = useToken();

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				token ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
}

export default ProtectedRoute;
