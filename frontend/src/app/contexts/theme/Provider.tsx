// Local Imports
import { useLayoutEffect, type ReactNode, type FC, useState } from 'react';
// import { defaultTheme } from 'configs/theme.config';
// import { useLocalStorage } from "hooks";
import { ThemeContext } from "./context";
import { defaultTheme } from '../../../configs/theme.config';

// ----------------------------------------------------------------------

const initialState = {
  // ...defaultTheme,
  isDark: false,
  publicThemeLayout: 'main-layout',
  setThemeMode: () => {},
  setThemeLayout: () => {},
  toggleMonochromeMode: () => {},
  setLightColorScheme: () => {},
  setDarkColorScheme: () => {},
  setPrimaryColorScheme: () => {},
  setNotificationPosition: () => {},
  setNotificationExpand: () => {},
  resetTheme: () => {},
};

const _html = document?.documentElement;

interface IComp {
  children: ReactNode
}

export const ThemeProvider: FC<IComp> = ({ children }) => {


  // const [settings, setSettings] = useLocalStorage("settings", {
  //   themeMode: initialState.themeMode,
  //   themeLayout: initialState.themeLayout,
  //   cardSkin: initialState.cardSkin,
  //   isMonochrome: initialState.isMonochrome,
  //   darkColorScheme: initialState.darkColorScheme,
  //   lightColorScheme: initialState.lightColorScheme,
  //   primaryColorScheme: initialState.primaryColorScheme,
  //   notification: { ...initialState.notification },
  // });

    const [settings, setSettings] = useState({...initialState});

  // const isDark =
  //   (settings.themeMode === "system" && isDarkOS) ||
  //   settings.themeMode === "dark";

  const isDark = false;

  const setThemeMode = (val: any) => {
    setSettings((settings) => {
      return {
        ...settings,
        themeMode: val,
      };
    });
  };


  /*

  const setThemeLayout = (val: any) => {
    setSettings({
      ...settings,
      themeLayout: val,
    });
  };

  const setMonochromeMode = (val: any) => {
    setSettings({
      ...settings,
      isMonochrome: val,
    });
  };

  const setDarkColorScheme = (val: any) => {
    setSettings({
      ...settings,
      darkColorScheme: {
        name: val,
        // ...colors[val],
      },
    });
  };

  const setLightColorScheme = (val: any) => {
    setSettings({
      ...settings,
      lightColorScheme: {
        name: val,
        // ...colors[val],
      },
    });
  };

  const setPrimaryColorScheme = (val: any) => {
    setSettings((settings) => {
      return {
        ...settings,
        primaryColorScheme: {
          name: val,
          // ...colors[val],
        },
      };
    });
  };

  const setNotificationPosition = (val: any) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        position: val,
      },
    });
  };

  const setNotificationExpand = (val: any) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        isExpanded: val,
      },
    });
  };

  const setNotificationMaxCount = (val: any) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        visibleToasts: val,
      },
    });
  };

  const setCardSkin = (val: any) => {
    setSettings((settings) => {
      return { ...settings, cardSkin: val };
    });
  };

  const resetTheme = () => {
    setSettings({
      publicThemeLayout: initialState.publicThemeLayout,
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      isMonochrome: initialState.isMonochrome,
      darkColorScheme: initialState.darkColorScheme,
      lightColorScheme: initialState.lightColorScheme,
      primaryColorScheme: initialState.primaryColorScheme,
      cardSkin: initialState.cardSkin,
      notification: { ...initialState.notification },
    });
  };

  useLayoutEffect(() => {
    isDark ? _html.classList.add("dark") : _html.classList.remove("dark");
  }, [isDark]);

  useLayoutEffect(() => {
    settings.isMonochrome
      ? document.body.classList.add("is-monochrome")
      : document.body.classList.remove("is-monochrome");
  }, [settings.isMonochrome]);

  useLayoutEffect(() => {
    _html.dataset.themeLight = settings.lightColorScheme.name;
  }, [settings.lightColorScheme]);

  useLayoutEffect(() => {
    _html.dataset.themeDark = settings.darkColorScheme.name;
  }, [settings.darkColorScheme]);

  useLayoutEffect(() => {
    _html.dataset.themePrimary = settings.primaryColorScheme.name;
  }, [settings.primaryColorScheme]);

  useLayoutEffect(() => {
    _html.dataset.cardSkin = settings.cardSkin;
  }, [settings.cardSkin]);

  useLayoutEffect(() => {
    if (document) document.body.dataset.layout = settings.themeLayout;
  }, [settings.themeLayout]);



  */


  if (!children) {
    return null;
  }

  return (
    <ThemeContext
      value={{
        ...settings,
        isDark,
        setThemeMode,
        // setThemeLayout,
        // setLightColorScheme,
        // setDarkColorScheme,
        // setPrimaryColorScheme,
        // setNotificationPosition,
        // setNotificationExpand,
        // // setNotificationMaxCount,
        // // setCardSkin,
        // // setSettings,
        // resetTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
}