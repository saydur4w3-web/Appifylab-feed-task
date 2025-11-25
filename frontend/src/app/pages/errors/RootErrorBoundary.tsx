// Import Depndencies
import { isRouteErrorResponse, useRouteError } from "react-router";
import { lazy } from "react";
import { Loadable } from "../../../components/shared/Loadable";

// Local Imports

// ----------------------------------------------------------------------

const app = {
//   401: lazy(() => import("./401")),
  404: lazy(() => import("./404")),
//   429: lazy(() => import("./429")),
//   500: lazy(() => import("./500")),
};

function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // const Component = Loadable(app[error.status]);
    const Component = Loadable(app['404']);
    return <Component />;
  }

  throw error;

  // return <div>Something went wrong</div>;
}

export default RootErrorBoundary;
