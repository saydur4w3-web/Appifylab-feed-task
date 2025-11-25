import React, { useState } from "react";
import { Fetch } from "../../../../utils/fetch";
import { ty_comment_item } from "../../../../types/comment.type";
import { CommentInput } from "../comments/commentInput";
import { DEFAULT_IMG_USER } from "../../../../constants/app.constant";
import { formatTimeAgo } from "../../../../utils/formatTimeAgo";
import { ReactionButton } from "../reaction/reactionButton";
import { useCreateReactComment } from "../../../../hooks/reactQuery/reactions";
import { CommentReactions } from "../comments/commentReactions";
import { reactionIdToKey } from "../../../../utils/reactionUtils";

interface CommentItemProps {
  commentData: ty_comment_item;
  postId: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  commentData,
  postId,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<ty_comment_item[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyPagination, setReplyPagination] = useState<any>(null);
  const [_, reactInc] = React.useReducer((x) => x + 1, 0);

  const { mutate: reactCreate } = useCreateReactComment();

  const loadReplies = async (cursor?: string) => {
    setLoading(true);

    try {
      const res = await Fetch<any>({
        url: `/comments/single/${commentData.id}${
          cursor ? `?cursor=${cursor}` : ""
        }`,
      });

      if (!cursor) {
        // First load
        setReplies(res.replies);
      } else {
        // Pagination load more
        setReplies((p) => [...p, ...res.replies]);
      }

      setReplyPagination(res.pagination);
    } catch (err) {
      console.error("Error loading replies:", err);
    }

    setLoading(false);
  };

  const toggleReplies = async () => {
    if (!showReplies) {
      if (replies.length === 0) {
        await loadReplies();
      }
    }

    setShowReplies(!showReplies);
  };

  const handleNewReply = (newReply: ty_comment_item) => {
    setReplies((p) => [newReply, ...p]);
  };

  const updateCommentReactionCounts = (
    commentData: any,
    newReactionId: number | null
  ) => {
    const previousReactionId = commentData.reactedReactionId;

    // Decrease previous reaction count if user had reacted before
    if (previousReactionId) {
      const prevKey = reactionIdToKey(previousReactionId);
      commentData[prevKey] = Math.max(0, commentData[prevKey] - 1);
      commentData.reaction_count = Math.max(0, commentData.reaction_count - 1);
    }

    // If user removed reaction (newReactionId === null), stop here
    if (!newReactionId) {
      commentData.isReacted = false;
      commentData.reactedReactionId = null;
      return;
    }

    // Add new reaction
    const newKey = reactionIdToKey(newReactionId);
    commentData[newKey] = (commentData[newKey] || 0) + 1;
    commentData.reaction_count = (commentData.reaction_count || 0) + 1;

    // Update user reaction state
    commentData.isReacted = true;
    commentData.reactedReactionId = newReactionId;
  };

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <span className="_comment_image_link cursor">
          <img
            src={commentData.user.profile_img || DEFAULT_IMG_USER}
            alt=""
            className="_comment_img1"
          />
        </span>
      </div>

      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <span className="cursor">
                <h4 className="_comment_name_title">
                  {commentData.user.first_name} {commentData.user.last_name}
                </h4>
              </span>
            </div>
          </div>

          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{commentData.content}</span>
            </p>
          </div>

          <div className="_total_reactions">
            <CommentReactions comment={commentData} />
          </div>

          <div className="_comment_reply" style={{ marginTop: "10px" }}>
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                {/* <li><span>Like · </span></li> */}


<div style={{ position: "relative", display: "inline-block" }}>
  <ReactionButton
    variant="comment"
    isReacted={commentData.isReacted}
    reactedReactionId={commentData.reactedReactionId}
    onReact={(reactionId) => {
      reactCreate({ commentId: commentData.id, reactionId });
      updateCommentReactionCounts(commentData, reactionId);
      reactInc();
    }}
  />
</div>



                <li>
                  <span onClick={toggleReplies}>Reply · </span>
                </li>

                {commentData.total_reply > 0 && (
                  <li>
                    <span
                      onClick={toggleReplies}
                      style={{ cursor: "pointer", color: "#1877F2" }}
                    >
                      {showReplies
                        ? "Hide replies"
                        : `Show replies (${commentData.total_reply})`}
                    </span>
                  </li>
                )}

                <li>
                  <span className="_time_link">
                    {" "}
                    {formatTimeAgo(commentData.created_at, true)}{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Replies Section --- */}
        {showReplies && (
          <div style={{ marginLeft: "10px", marginTop: "5px" }}>
            <CommentInput
              parentId={commentData.id}
              postId={postId}
              onCreated={handleNewReply}
            />

            {loading && <p>Loading replies...</p>}

            {replies.map((reply) => (
              <CommentItem key={reply.id} commentData={reply} postId={postId} />
            ))}

            {/* Load more replies */}
            {replyPagination?.hasMore && (
              <button
                onClick={() => loadReplies(replyPagination.nextCursor)}
                className=" btn btn-link"
              >
                Load more replies
              </button>
            )}

            {/* {!loading && replies.length === 0 && <p>No replies yet.</p>} */}
          </div>
        )}
      </div>
    </div>
  );
};
