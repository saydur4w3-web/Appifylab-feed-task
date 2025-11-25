import React, { useState, useEffect, useRef } from "react";

import { ReactionModal } from "../reaction/reactionModal";
import {
  getReactionImg,
  mapReactionSummaryFromCounts,
} from "../../../../utils/reactionUtils";

interface Props {
  comment: any;
}

export const CommentReactions: React.FC<Props> = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Build reaction icons array
  const reactionCounts = [
    { id: 1, count: comment.like_count },
    { id: 2, count: comment.love_count },
    { id: 3, count: comment.haha_count },
    { id: 4, count: comment.wow_count },
    { id: 5, count: comment.sad_count },
    { id: 6, count: comment.angry_count },
  ];

  // Only show icons where count > 0
  const visible = reactionCounts.filter((r) => r.count > 0);

  if (visible.length === 0) return null; // nothing to show

  const totalCount = visible.reduce((sum, r) => sum + r.count, 0);

  const mappedReactionSummary = mapReactionSummaryFromCounts(
    reactionCounts.map((rc) => ({
      id: rc.id,
      count: rc.count,
    }))
  );

  return (
    <>
      <div
        className="_comment_reactions_wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: 4,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Show up to 3 icons */}
        {visible.slice(0, 3).map((r, index) => (
          <img
            key={r.id}
            src={getReactionImg(r.id) || ""}
            alt=""
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              marginLeft: index === 0 ? "0px" : "-6px",
            }}
          />
        ))}

        {/* Total count */}
        <span style={{ marginLeft: 6, fontSize: "13px", color: "#65676B" }}>
          {totalCount}
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          itemId={comment.id}
          type="comment"
          reactionSummary={mappedReactionSummary}
        />
      )}
    </>
  );
};
