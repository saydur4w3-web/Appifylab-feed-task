import { ReactNode } from "react";

export type ty_reducer_provider = {
  children: ReactNode;
};

export type ty_auth_user = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_img?: string;
};

export interface ty_rkMutation {
  successHandler: () => void;
}

export interface ty_api_pagination {
  hasMore: boolean;
  nextCursor?: string;
}
