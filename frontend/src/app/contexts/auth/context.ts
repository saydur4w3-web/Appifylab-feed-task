import { createCtx } from "../createCtx";
import type { T_Ctx, T_state } from "./types";

export const { Provider: AuthContextProvider, useCtx: useAuthContext } = createCtx<T_Ctx>(
    "useThemeContext must be used within ThemeProvider"
);
