import { useState, useRef, useEffect, FC, useCallback } from "react";
import {
  MoreVerticalIcon,
  SaveIcon,
  NotificationIcon,
  HideIcon,
  EditIcon,
  DeleteIcon,
} from "../../../shared/icons";
import { ty_post_item } from "../../../../types/post.type";
import { formatTimeAgo } from "../../../../utils/formatTimeAgo";
import { PostOptions, T_DropdownItem } from "./postOptions";
import { DEFAULT_IMG_USER } from "../../../../constants/app.constant";
import { CreatePost } from "../../create";
import { useAuthContext } from "../../../../app/contexts/auth/context";
import { useDeletePost } from "../../../../hooks/reactQuery/posts";

interface IComp {
  post: ty_post_item;
  cursor: string|null;
}

export const PostHeader: FC<IComp> = ({ post, cursor }) => {
  const { user, created_at, id: postId } = post;
  const { user: currentUser } = useAuthContext();

  const delteMutation = useDeletePost(cursor);

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [editPost, setEditPost] = useState<ty_post_item | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Define action handlers using useCallback for stability
  const handleSave = useCallback(
    () => console.log(`Saving post: ${postId}`),
    [postId]
  );
  const handleDelete = useCallback(
    () => console.log(`Deleting post: ${postId}`),
    [postId]
  );
  // ... other handlers

  // Define the menu items, using the action handlers
  let postMenuItems: T_DropdownItem[] = [
    { icon: SaveIcon, label: "Save Post", onClick: handleSave },
    {
      icon: NotificationIcon,
      label: "Turn On Notification",
      onClick: () => console.log("Toggle notification"),
    },
  ];

  if(currentUser && currentUser.id === post.user_id) {
    postMenuItems = [
      ...postMenuItems,
    {
      icon: EditIcon,
      label: "Edit Post",
      onClick: () => setEditPost({ ...post }),
    },
    { icon: DeleteIcon, label: "Delete Post", onClick: () => delteMutation.mutate(post.id) },
    ]
  }

  return (
    <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
      <div className="_feed_inner_timeline_post_top">
        {/* Avatar + Name */}
        <div className="_feed_inner_timeline_post_box">
          <div className="_feed_inner_timeline_post_box_image">
            <img
              src={user.profile_img || DEFAULT_IMG_USER}
              alt=""
              className="_post_img"
            />
          </div>
          <div className="_feed_inner_timeline_post_box_txt">
            <h4 className="_feed_inner_timeline_post_box_title">
              {" "}
              {user.first_name} {user.last_name}{" "}
            </h4>
            <p className="_feed_inner_timeline_post_box_para">
              {formatTimeAgo(created_at)} · <span> {post.is_public ? 'Public': 'Private'} </span>
            </p>
          </div>
        </div>

        <PostOptions
          ref={wrapperRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={postMenuItems}
        />
      </div>

      {editPost && (
  <div
    className="modal fade show"
    style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
    onClick={() => setEditPost(null)}
  >
    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content p-3">
        <CreatePost post={editPost} onClose={() => setEditPost(null)} cursor={cursor} />
      </div>
    </div>
  </div>
)}


    </div>
  );
};
