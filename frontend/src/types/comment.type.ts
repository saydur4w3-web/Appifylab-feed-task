interface User {
  id: string;
  first_name: string;
  last_name: string;
  profile_img: string | null;
}

interface ty_comment_reply {
  id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  total_reply: number;
  user_id: string;
  like_count: number;
  love_count: number;
  haha_count: number;
  wow_count: number;
  sad_count: number;
  angry_count: number;
  user: User;
  isReacted: boolean;
  reactedReactionId?: number;
}

export interface ty_comment_item {
  id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  total_reply: number;
  user_id: string;
  like_count: number;
  love_count: number;
  haha_count: number;
  wow_count: number;
  sad_count: number;
  angry_count: number;
  user: User;

  replies?: ty_comment_reply[];
  isReacted: boolean;
  reactedReactionId?: number;
}
