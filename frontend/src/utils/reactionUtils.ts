import { ReactionTypeEnum } from "../types/reactions.type";
import { ty_reaction_item } from "../types/reactions.type";

export const reactionIcons: Record<number, string> = {
  [ReactionTypeEnum.LIKE]: "/images/reactions/like.png",
  [ReactionTypeEnum.LOVE]: "/images/reactions/love.png",
  [ReactionTypeEnum.HAHA]: "/images/reactions/haha.png",
  [ReactionTypeEnum.WOW]: "/images/reactions/wow.png",
  [ReactionTypeEnum.SAD]: "/images/reactions/sad.png",
  [ReactionTypeEnum.ANGRY]: "/images/reactions/angry.png",
};

export const Reaction_Img_None = "/images/reactions/none.png";

export const getReactionImg = (id: number) => {
  return reactionIcons[id] || null;
};

export const mapReactionSummary = (reactions: ty_reaction_item[]) => {
  return Object.values(ReactionTypeEnum)
    .filter((v) => typeof v === "number")
    .map((reactionId) => ({
      reaction_id: reactionId as number,
      icon: reactionIcons[reactionId as number],
      count: reactions.filter((r) => r.reaction_id === reactionId).length,
    }));
};


export const mapReactionSummaryFromCounts = (
  reactionCounts: { id: number; count: number }[]
) => {
  return Object.values(ReactionTypeEnum)
    .filter((v) => typeof v === "number")
    .map((reactionId) => {
      const found = reactionCounts.find((r) => r.id === reactionId);

      return {
        reaction_id: reactionId as number,
        icon: reactionIcons[reactionId as number],
        count: found?.count ?? 0,
      };
    });
};



// Map reactionId to the corresponding comment count field
export const reactionIdToKey = (reactionId: number): any => {
  switch (reactionId) {
    case 1:
      return "like_count";
    case 2:
      return "love_count";
    case 3:
      return "haha_count";
    case 4:
      return "wow_count";
    case 5:
      return "sad_count";
    case 6:
      return "angry_count";
    default:
      throw new Error("Invalid reactionId");
  }
};