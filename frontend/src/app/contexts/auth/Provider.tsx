// Import Dependencies
import { useEffect, useReducer } from "react";

// Local Imports
// import axios from "utils/axios";
// import { isTokenValid, setSession } from "utils/jwt";
import { AuthContextProvider } from "./context";
import { T_state } from "./types";
import { ty_auth_user, ty_reducer_provider } from "../../../types/general.type";
import { Fetch } from "../../../utils/fetch";
import { toast } from "sonner";

// ----------------------------------------------------------------------

// const userPayloadData = (usr) => {
//   const data = usr.data;
//   const user = data.user

//   return {
//     id: user.id,
//     roles: data.roles,
//     fullName: user.fullName,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     userName: user.userName,
//     email: user.email,
//   }

// }

enum ty_actions {
  INITIALIZE = "INITIALIZE",
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOG_OUT = "LOG_OUT",
}

type T_dispatch =
  | {
      type: ty_actions.INITIALIZE;
      payload: { isAuthenticated: boolean; user: ty_auth_user | null };
    }
  | { type: ty_actions.LOGIN_REQUEST }
  | { type: ty_actions.LOGIN_SUCCESS; payload: { user: ty_auth_user } }
  | { type: ty_actions.LOGIN_ERROR; payload: { errorMessage: string } }
  | { type: ty_actions.LOG_OUT };

const initialState: T_state = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducer = (state: T_state, action: T_dispatch): T_state => {
  switch (action.type) {
    case ty_actions.INITIALIZE: {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }

    case ty_actions.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ty_actions.LOGIN_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user,
      };
    }

    case ty_actions.LOGIN_ERROR: {
      const { errorMessage } = action.payload;

      return {
        ...state,
        errorMessage,
        isLoading: false,
      };
    }

    case ty_actions.LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    default:
      return state;

    //   LOGIN_SUCCESS: (state, action) => {
    //     const { user } = action.payload;
    //     return {
    //       ...state,
    //       isAuthenticated: true,
    //       isLoading: false,
    //       user,
    //     };
    //   },
  }
};

export const AuthProvider = ({ children }: ty_reducer_provider) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await Fetch<any>({
          url: "/users/me",
        });

        dispatch({
          type: ty_actions.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: userData,
          },
        });
      } catch {
        dispatch({
          type: ty_actions.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    dispatch({
      type: ty_actions.LOGIN_REQUEST,
    });

    try {
      await Fetch({
        url: "/auth/signin",
        method: "POST",
        data,
      });

      const userData = await Fetch<any>({
        url: "/users/me",
      });

      dispatch({
        type: ty_actions.LOGIN_SUCCESS,
        payload: {
          user: userData,
        },
      });
    } catch (err) {
      toast.error("Failed to sign in");
    }
  };

  const logout = async () => {
    try {
      await Fetch({
        url: "/auth/signout",
        method: "POST",
      });

      dispatch({ type: ty_actions.LOG_OUT });
    } catch {}
  };

  return (
    <AuthContextProvider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContextProvider>
  );
};
