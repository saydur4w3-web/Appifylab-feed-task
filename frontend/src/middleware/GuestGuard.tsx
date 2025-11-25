// Import Dependencies
import { Navigate, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "../app/contexts/auth/context";
import { GHOST_ENTRY_PATH, REDIRECT_URL_KEY, HOME_PATH } from "../constants/app.constant";

// ----------------------------------------------------------------------


export default function GuestGuard() {
  const outlet = useOutlet();
  const { isAuthenticated } = useAuthContext();
  // const isAuthenticated = false;


  const url = `${new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY,
  )}`;

  // const redirUrl = url ?? '/';


  if (isAuthenticated) {
    if (url && url !== "" && url !== 'null') {
      return <Navigate to={url} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  return <>{outlet}</>;
}
