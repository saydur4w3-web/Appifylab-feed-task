import React from "react";
import { CommentIcon, ShareIcon } from "../../../shared/icons";
import { ty_post_item } from "../../../../types/post.type";
import { useCreateReactPost } from "../../../../hooks/reactQuery/reactions";
import { ReactionButton } from "../reaction/reactionButton";

interface ActionsProps {
  post: ty_post_item;
  reactInc: React.ActionDispatch<[]>;
}

export const Actions: React.FC<ActionsProps> = ({ post, reactInc }) => {
  const { isReacted, reactedReactionId, id: postId } = post;

  const { mutate: reactToPost } = useCreateReactPost();

  const handleReact = (reactionId: number | null) => {
    reactToPost(
      { postId, reactionId },
      {
        onSuccess: () => {

          if (reactionId) {
            post.reactedReactionId = reactionId;
            post.isReacted = true;
          } else {
            post.reactedReactionId = undefined;
            post.isReacted = false;
          }

          reactInc();
        },
      }
    );
  };

  return (
    <div className="_feed_inner_timeline_reaction">
      {/* New reusable reaction button */}
      <ReactionButton
        isReacted={isReacted}
        reactedReactionId={reactedReactionId}
        onReact={handleReact}
      />

      {/* Comment */}
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link">
          <CommentIcon />
          Comment
        </span>
      </button>

      {/* Share */}
      <button className="_feed_inner_timeline_reaction_share _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link">
          <ShareIcon />
          Share
        </span>
      </button>
    </div>
  );
};
