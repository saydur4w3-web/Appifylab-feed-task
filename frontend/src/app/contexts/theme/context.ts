import { createCtx } from "../createCtx";
import type { ty_ctx } from "./type";

export const { Provider: ThemeContext, useCtx: useThemeContext } = createCtx<ty_ctx>(
    "useThemeContext must be used within ThemeProvider"
);
