import { FC } from "react";
import { DesktopStories } from "./desktopStories";
import { MobileStories } from "./mobileStories";

export const Stories: FC = () => {
  return (
    <>
      <DesktopStories />
      <MobileStories />
    </>
  );
};
