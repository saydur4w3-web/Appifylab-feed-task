// Import Dependencies
import { createBrowserRouter } from "react-router";

// Local Imports
// import { SplashScreen } from "components/template/SplashScreen";
import { privateRoutes } from "./private";
import { guestRoutes } from "./guest";
// import { ghostRoutes } from "./ghost";
// import { publicRoutes } from "./public";
import Root from "../layouts/Root";
import RootErrorBoundary from "../pages/errors/RootErrorBoundary";

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    id: "root",
    Component: Root,
    // hydrateFallbackElement: <SplashScreen />,
    ErrorBoundary: RootErrorBoundary,
    children: [
      privateRoutes, 
      guestRoutes
      // ghostRoutes, 
      // publicRoutes
    ],
  },
]);

export default router;
