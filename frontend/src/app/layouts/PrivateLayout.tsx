import { useEffect } from "react";
import { Outlet } from "react-router";
import { DesktopHeader } from "../../components/header/desktopHeader";
import { MobileHeader } from "../../components/header/mobileHeader";
import { ThemeToggle } from "../../components/ui/themeToggle";
import { MobileBottomNav } from "../../components/header/mobileBottomNav";

export function PrivateLayout() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const layout = document.querySelector("._layout_main_wrapper");
      if (layout) {
        if (isDark) {
          layout.classList.add("_dark_wrapper");
        } else {
          layout.classList.remove("_dark_wrapper");
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      document
        .querySelector("._layout_main_wrapper")
        ?.classList.add("_dark_wrapper");
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="_layout _layout_main_wrapper">
      <ThemeToggle />

      <div className="_main_layout">
        <div className="d-none d-lg-block">
          <DesktopHeader />
        </div>

        {/* Mobile Header - hidden on desktop */}
        <div className="d-lg-none">
          <MobileHeader />
        </div>

        <div className="d-lg-none">
          <MobileBottomNav />
        </div>

        <div className="container _custom_container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
