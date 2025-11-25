import { PrivateLayout } from "../layouts/PrivateLayout";
import AuthGuard from "../../middleware/authGuard";
import { HomePage } from "../pages/home";

const privateRoutes = {
  id: "private",
  Component: AuthGuard,
  children: [
    {
      Component: PrivateLayout,
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "home",
          element: <HomePage />,
        },
      ],
    },
  ],
};

export { privateRoutes };
