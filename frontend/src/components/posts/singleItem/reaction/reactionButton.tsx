import React, { useState, useRef } from "react";

import { ReactionTypeEnum } from "../../../../types/reactions.type";
import {
  getReactionImg,
  Reaction_Img_None,
} from "../../../../utils/reactionUtils";

interface ReactionButtonProps {
  isReacted: boolean;
  reactedReactionId?: number;
  onReact: (reactionId: number | null) => void;
  variant?: "post" | "comment";
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
  isReacted,
  reactedReactionId,
  onReact,
  variant = "post",
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const reactionImg =
    isReacted && reactedReactionId
      ? getReactionImg(reactedReactionId)
      : Reaction_Img_None;

  const reactionLabel =
    isReacted && reactedReactionId
      ? ReactionTypeEnum[reactedReactionId].toLowerCase()
      : "Like";

  const reactionOptions = [
    ReactionTypeEnum.LIKE,
    ReactionTypeEnum.LOVE,
    ReactionTypeEnum.HAHA,
    ReactionTypeEnum.WOW,
    ReactionTypeEnum.SAD,
    ReactionTypeEnum.ANGRY,
  ];

  const handleSelect = (reactionId: number) => {
    if (isReacted && reactedReactionId === reactionId) {
      onReact(null);
    } else {
      onReact(reactionId);
    }
    setShowPicker(false);
  };

  return (
<div
  className="_reaction_btn_wrapper"
  style={{position: "relative",
    display: "inline-flex", 
    alignItems: "center", }}
  onMouseEnter={() => setShowPicker(true)}
  onMouseLeave={() => setShowPicker(false)}
>
      {/* MAIN BUTTON */}
      <button
        className={`_feed_reaction ${isReacted ? "_feed_reaction_active" : ""}`}
        style={{ background: "transparent", border: "none", padding: 0 }}
      >
        {variant === "post" ? (
          <span className="_feed_inner_timeline_reaction_link">
            <img
              src={reactionImg || ""}
              alt={reactionLabel}
              style={{ width: "30px", height: "30px", marginRight: "4px" }}
            />
            {reactionLabel}
          </span>
        ) : (
          <span
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <img
              src={reactionImg || ""}
              alt={reactionLabel}
              style={{ width: "20px", height: "20px" }}
            />
          </span>
        )}
      </button>

      {/* PICKER — positioned ABSOLUTELY relative to wrapper */}
      {showPicker && (
        <div className="_reaction_picker_fixed">
          {reactionOptions.map((r) => (
            <button
              key={r}
              onClick={() => handleSelect(r)}
              className="_reaction_picker_item"
            >
              <img
                src={getReactionImg(r) || ""}
                alt={ReactionTypeEnum[r].toLowerCase()}
                style={{ width: "36px", height: "36px" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
