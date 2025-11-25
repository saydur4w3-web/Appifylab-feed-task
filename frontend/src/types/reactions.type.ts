export type ty_reaction_item = {
  reaction_id: number;
  user: {
    id: string;
    profile_img?: string;
  };
}


export type ReactionType =
  | 1 // 👍 like
  | 2 // ❤️ love
  | 3 // 😆 haha
  | 4 // 😮 wow
  | 5 // 😢 sad
  | 6 // 😡 angry
  // add more if needed



export interface ReactionUser {
  id: string;
  first_name: string;
  last_name: string;
  profile_img: string | null;
}

export interface ReactionBase {
  user_id: string;
  reaction_id: ReactionType;
  created_at: string;
  user: ReactionUser;
}

export interface ty_PostReaction extends ReactionBase {
  post_id: string;
}

export interface ty_CommentReaction extends ReactionBase {
  comment_id: string;
}

export interface ty_GetReactionsResponse {
  reactions: ty_PostReaction | ty_CommentReaction | null;
  pagination: {
    hasMore: boolean;
  };
}


export enum ReactionTypeEnum {
  LIKE = 1,
  LOVE = 2,
  HAHA = 3,
  WOW = 4,
  SAD = 5,
  ANGRY = 6,
}