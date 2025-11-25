import React, { useEffect, useState } from "react";
import { Fetch } from "../../../../utils/fetch";
import { ty_comment_item } from "../../../../types/comment.type";
import { Spinner } from "../../../shared/spinner";
import { CommentItem } from "./commentItem";
import { CommentInput, T_reactUpdate } from "./commentInput";

interface IComp {
  postId: string;
}

export const CommentList: React.FC<IComp> = ({ postId }) => {
  const [comments, setComments] = useState<ty_comment_item[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = async (cursor?: string) => {
    setIsLoading(true);

    try {
      const res = await Fetch<any>({
        url: `comments/post/${postId}${cursor ? `?cursor=${cursor}` : ""}`,
      });

      if (!cursor) {
        setComments(res.comments);
      } else {
        setComments((p) => [...p, ...res.comments]);
      }

      setPagination(res.pagination);
    } catch (err) {
      console.error("Error loading comments", err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleNewComment = (newComment: ty_comment_item) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const commentReactUpdateHandler = (dt: T_reactUpdate) => {

    let cmts = [...comments];
    const targetIdx = cmts.findIndex(el => el.id === dt.commentId);
    if(targetIdx > -1) {
      cmts[targetIdx].isReacted = true;
      cmts[targetIdx].reactedReactionId = dt.reactId;
    }

    setComments([...cmts])
  }

  if (isLoading && comments.length === 0) return <Spinner />;

  return (
    <div>
      <CommentInput postId={postId} parentId={null} onCreated={handleNewComment} />

      {comments.map((c) => (
        <CommentItem key={c.id} commentData={c} postId={postId} />
      ))}

      {pagination?.hasMore && (
        <button
                className=" btn btn-link"
          onClick={() => loadComments(pagination.nextCursor)}
        >
          Load more comments
        </button>
      )}
    </div>
  );
};
