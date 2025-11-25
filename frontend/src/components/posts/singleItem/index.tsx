import React, { FC } from "react";
import { PostHeader } from "./postData/postHeader";
import { Reactions } from "./reaction/reactions";
import { Actions } from "./postData/actions";
import { CommentInput } from "./comments/commentInput";
import { PostContent } from "./postData/content";
import { ty_post_item } from "../../../types/post.type";
import { CommentItem } from "./comments/commentItem";
import { CommentList } from "./comments/commenList";

interface IComp {
  postData: ty_post_item;
  setModalData: React.Dispatch<React.SetStateAction<ty_post_item | null>>;
  isDetail?: boolean;
  cursor: string|null;
}

export const PostSingle: FC<IComp> = ({ postData, setModalData, isDetail, cursor }) => {

    const [_, reactInc] = React.useReducer((x) => x + 1, 0);
  

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <PostHeader post={postData} cursor={cursor} />
      <PostContent post={postData} />
      <Reactions post={postData} />
      <Actions post={postData} reactInc={reactInc} />

      {!isDetail && (
        <CommentInput
          postId={postData.id}
          parentId={null}
          onCreated={dt => {

            if(postData.comments.length === 0) {
              postData.comments.push(dt)
            }
            else {
              postData.comments.unshift(dt)
            }

            reactInc();

          }
        }
        />
      )}

      <div className="_timline_comment_main">
        {postData.comment_count > 1 && !isDetail && (
          <div className="_previous_comment">
            <button
              type="button"
              className="_previous_comment_txt"
              onClick={() => {
                setModalData({ ...postData });
              }}
            >
              View {postData.comment_count - 1} previous comments
            </button>
          </div>
        )}

        {!isDetail ? (
          <div>
            {postData.comments.map((cmt) => (
              <CommentItem
                key={cmt.id}
                commentData={cmt}
                postId={postData.id}
              />
            ))}
          </div>
        ) : (
          <CommentList postId={postData.id} />
        )}

        {/* <CommentItem /> */}
      </div>
    </div>
  );
};
