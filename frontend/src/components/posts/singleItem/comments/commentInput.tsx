import React, { useState } from "react";
import { Fetch } from "../../../../utils/fetch";
import { useAuthContext } from "../../../../app/contexts/auth/context";
import { DEFAULT_IMG_USER } from "../../../../constants/app.constant";
import { ty_comment_item } from "../../../../types/comment.type";


export type T_reactUpdate = {
  commentId: string; reactId: number
}

interface CommentInputProps {
  postId: string;
  parentId?: string | null;
  onCreated?: (newComment: any) => void;
  // commentReactUpdateHandler: (dt: T_reactUpdate) => void
}

export const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  parentId = null,
  onCreated,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuthContext()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await Fetch<any>({
        url: "/comments",
        method: "POST",
        data: {
          post_id: postId,
          content: text,
          parent_id: parentId,
        },
      });

      setText("");

      if(!currentUser) return null;

          const newComment: ty_comment_item = {
      ...res,
      user: {
        id: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        profile_img: currentUser.profile_img,
      },
    };

      // send new comment back to parent
      onCreated?.(newComment);
    } catch (err) {
      console.error("Failed to create comment:", err);
    }

    setLoading(false);
  };

  return (
    <div className="_feed_inner_timeline_cooment_area">
      <div className="_feed_inner_comment_box">
        <form className="_feed_inner_comment_box_form" onSubmit={handleSubmit}>
          <div className="_feed_inner_comment_box_content">
            <div className="_feed_inner_comment_box_content_image">
              <img
                src={currentUser?.profile_img || DEFAULT_IMG_USER }
                alt=""
                className="_comment_img"
              />
            </div>

            <div className="_feed_inner_comment_box_content_txt">
              <textarea
                className="form-control _comment_textarea"
                placeholder="Write a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

          <div className="_feed_inner_comment_box_icon">
            <button
              type="submit"
              className=" btn btn-secondary btn-sm"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
