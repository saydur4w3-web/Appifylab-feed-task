import GuestGuard from "../../middleware/GuestGuard";
import { LoginPage } from "../pages/auth/loginPage";
import { SignUpPage } from "../pages/auth/signUpPage";

export const guestRoutes = {
  id: "guest",
  Component: GuestGuard,
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
        {
      path: "signup",
      element: <SignUpPage />,
    },
  ],
};
