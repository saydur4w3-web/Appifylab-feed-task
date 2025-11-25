import { ty_auth_user } from "../../../types/general.type";

export interface T_state {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  errorMessage: null | string;
  user: ty_auth_user | null;
}

export interface T_Ctx extends T_state {
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}
