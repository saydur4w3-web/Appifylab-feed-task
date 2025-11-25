import { Fragment, useLayoutEffect, type FC, type ReactNode } from "react";
import { APP_NAME } from "../../constants/app.constant";
// import { APP_NAME } from '../../constants/app.constant';

interface IComp {
  children: ReactNode;
  title?: string;
  component?: any;
}

export const Page: FC<IComp> = ({
  title = "",
  component = Fragment,
  children,
}) => {
  const Component = component;

  useLayoutEffect(() => {
    window.document.title = title + " - " + APP_NAME;
  }, [title]);

  return <Component>{children}</Component>;
};
