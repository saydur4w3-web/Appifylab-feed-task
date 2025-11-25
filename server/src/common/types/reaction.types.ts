export enum ReactionTypeEnum {
  LIKE = 1,
  LOVE = 2,
  HAHA = 3,
  WOW = 4,
  SAD = 5,
  ANGRY = 6,
}

export const ty_REACTION_ID = new Set<number>([
  ReactionTypeEnum.LIKE,
  ReactionTypeEnum.LOVE,
  ReactionTypeEnum.HAHA,
  ReactionTypeEnum.WOW,
  ReactionTypeEnum.SAD,
  ReactionTypeEnum.ANGRY,
]);
