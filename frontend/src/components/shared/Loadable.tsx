// Import Dependencies
import { Suspense } from "react";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Loadable = (Component: any, Fallback?: any) => (props: any) => (
  <Suspense fallback={Fallback && <Fallback />}>
    <Component {...props} />
  </Suspense>
);

export { Loadable };
