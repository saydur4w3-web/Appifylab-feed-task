import { ty_api_pagination } from "./general.type";

interface ty_user {
  id: string;
  first_name: string;
  last_name: string;
  profile_img: string | null;
}

interface ty_reaction {
  reaction_id: number;
  user: {
    id: string;
    profile_img?: string;
  };
}

interface ty_comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  image_url: string | null;
  comment_id: string;
  created_at: string;
  updated_at: string;
  total_reply: number;
  like_count: number;
  love_count: number;
  haha_count: number;
  wow_count: number;
  sad_count: number;
  angry_count: number;
  user: ty_user;
  isReacted: boolean;
  reactedReactionId?: number;
}

export interface ty_post_item {
  id: string;
  user_id: string;
  content: string;
  image_url: string;
  is_public: boolean;
  react_count: number;
  comment_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
  user: ty_user;
  comments: ty_comment[];
  reactions: ty_reaction[];
  isReacted: boolean;
  reactedReactionId?: number;
}

export interface ty_posts_api_res {
  posts: ty_post_item[];
  pagination: ty_api_pagination;
}
