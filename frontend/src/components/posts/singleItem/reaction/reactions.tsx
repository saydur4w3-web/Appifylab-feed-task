
import React, { useState, useEffect, useRef } from "react";
import { ty_post_item } from "../../../../types/post.type";
import { DEFAULT_IMG_USER } from "../../../../constants/app.constant";
import { ReactionModal } from "./reactionModal";
import { mapReactionSummary } from "../../../../utils/reactionUtils";

interface IComp {
  post: ty_post_item;
}


export const Reactions: React.FC<IComp> = ({ post }) => {
  const { react_count, reactions } = post;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click for modal close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Only show max 5 reactions
  const visibleReactions = reactions.slice(0, 5);
  const remainingCount = react_count - visibleReactions.length;

  const mappedReactionSummary = mapReactionSummary(post.reactions);

  return (
    <>
      {/* Reaction Summary */}
      <div
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: "pointer" }}
        className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26"
      >
        <div className="_feed_inner_timeline_total_reacts_image">
          {visibleReactions.map((r, i) => (
            <img
              key={r.user.id}
              src={r.user.profile_img || DEFAULT_IMG_USER}
              alt=""
              className={i === 0 ? "_react_img1" : "_react_img"}
            />
          ))}

          {remainingCount > 0 && (
            <p className="_feed_inner_timeline_total_reacts_para">
              {remainingCount}+
            </p>
          )}
        </div>
      </div>

      {
        isModalOpen && (
          <ReactionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            itemId={post.id}
            type="post"
            reactionSummary={mappedReactionSummary}
          />
        )
      }


    </>
  );
};