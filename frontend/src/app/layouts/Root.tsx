import { Outlet, ScrollRestoration } from "react-router";
import { lazy } from "react";
import { Loadable } from "../../components/shared/Loadable";


const Toaster = Loadable(lazy(() => import('../../components/template/Toaster')));

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster />
    </>
  );

}

export default Root;
