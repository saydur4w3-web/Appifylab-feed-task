  -- ===========================================================================
  -- ===========================================================================
  -- ===========================================================================
  -- React TO POST
  -- ===========================================================================
  -- ===========================================================================
  

CREATE OR REPLACE FUNCTION react_to_post(
    p_user_id UUID,
    p_post_id UUID,
    p_reaction_id SMALLINT
)
RETURNS TEXT AS $$
DECLARE
    existing_reaction SMALLINT;
BEGIN
    -- 1. Check existing reaction
    SELECT reaction_id INTO existing_reaction
    FROM "PostReaction"
    WHERE user_id = p_user_id AND post_id = p_post_id;

    --------------------------------------------------------------------
    -- CASE A: Remove reaction (incoming is NULL)
    --------------------------------------------------------------------
    IF p_reaction_id IS NULL THEN
        IF existing_reaction IS NOT NULL THEN
            -- delete reaction
            DELETE FROM "PostReaction"
            WHERE user_id = p_user_id AND post_id = p_post_id;

            -- decrement counter
            UPDATE "Post"
            SET react_count = react_count - 1
            WHERE id = p_post_id;

            RETURN 'Reaction removed';
        ELSE
            RETURN 'No reaction to remove';
        END IF;
    END IF;

    --------------------------------------------------------------------
    -- CASE B: Add new reaction
    --------------------------------------------------------------------
    IF existing_reaction IS NULL THEN
        INSERT INTO "PostReaction" (user_id, post_id, reaction_id)
        VALUES (p_user_id, p_post_id, p_reaction_id);

        UPDATE "Post"
        SET react_count = react_count + 1
        WHERE id = p_post_id;

        RETURN 'Reaction added';
    END IF;

    --------------------------------------------------------------------
    -- CASE C: Same reaction → do nothing
    --------------------------------------------------------------------
    IF existing_reaction = p_reaction_id THEN
        RETURN 'Reaction unchanged';
    END IF;

    --------------------------------------------------------------------
    -- CASE D: Update reaction
    --------------------------------------------------------------------
    UPDATE "PostReaction"
    SET reaction_id = p_reaction_id
    WHERE user_id = p_user_id AND post_id = p_post_id;

    RETURN 'Reaction updated';
END;
$$ LANGUAGE plpgsql VOLATILE;



  -- ===========================================================================
  -- ===========================================================================
  -- ===========================================================================
  -- React TO COMMENT
  -- ===========================================================================
  -- ===========================================================================
CREATE OR REPLACE FUNCTION react_to_comment(
    p_user_id UUID,
    p_comment_id UUID,
    p_reaction_id SMALLINT
)
RETURNS TEXT AS $$
DECLARE
    existing_reaction SMALLINT;
BEGIN
    -- Fetch existing reaction
    SELECT reaction_id INTO existing_reaction
    FROM "CommentReaction"
    WHERE user_id = p_user_id AND comment_id = p_comment_id;

    --------------------------------------------------------------------
    -- CASE A: Remove reaction
    --------------------------------------------------------------------
    IF p_reaction_id IS NULL THEN
        IF existing_reaction IS NOT NULL THEN

            UPDATE "Comment"
            SET
                like_count   = like_count   - (CASE WHEN existing_reaction = 1 THEN 1 ELSE 0 END),
                love_count   = love_count   - (CASE WHEN existing_reaction = 2 THEN 1 ELSE 0 END),
                haha_count   = haha_count   - (CASE WHEN existing_reaction = 3 THEN 1 ELSE 0 END),
                wow_count    = wow_count    - (CASE WHEN existing_reaction = 4 THEN 1 ELSE 0 END),
                sad_count    = sad_count    - (CASE WHEN existing_reaction = 5 THEN 1 ELSE 0 END),
                angry_count  = angry_count  - (CASE WHEN existing_reaction = 6 THEN 1 ELSE 0 END)
            WHERE id = p_comment_id;

            DELETE FROM "CommentReaction"
            WHERE user_id = p_user_id AND comment_id = p_comment_id;

            RETURN 'Reaction removed';
        ELSE
            RETURN 'No reaction to remove';
        END IF;
    END IF;

    --------------------------------------------------------------------
    -- CASE B: No existing reaction → create new
    --------------------------------------------------------------------
    IF existing_reaction IS NULL THEN
        INSERT INTO "CommentReaction" (user_id, comment_id, reaction_id)
        VALUES (p_user_id, p_comment_id, p_reaction_id);

        UPDATE "Comment"
        SET
            like_count   = like_count   + (CASE WHEN p_reaction_id = 1 THEN 1 ELSE 0 END),
            love_count   = love_count   + (CASE WHEN p_reaction_id = 2 THEN 1 ELSE 0 END),
            haha_count   = haha_count   + (CASE WHEN p_reaction_id = 3 THEN 1 ELSE 0 END),
            wow_count    = wow_count    + (CASE WHEN p_reaction_id = 4 THEN 1 ELSE 0 END),
            sad_count    = sad_count    + (CASE WHEN p_reaction_id = 5 THEN 1 ELSE 0 END),
            angry_count  = angry_count  + (CASE WHEN p_reaction_id = 6 THEN 1 ELSE 0 END)
        WHERE id = p_comment_id;

        RETURN 'Reaction added';
    END IF;

    --------------------------------------------------------------------
    -- CASE C: Same reaction → do nothing
    --------------------------------------------------------------------
    IF existing_reaction = p_reaction_id THEN
        RETURN 'Reaction unchanged';
    END IF;

    --------------------------------------------------------------------
    -- CASE D: Update reaction
    --------------------------------------------------------------------
    UPDATE "CommentReaction"
    SET reaction_id = p_reaction_id
    WHERE user_id = p_user_id AND comment_id = p_comment_id;

    UPDATE "Comment"
    SET 
        like_count = like_count
            - (CASE WHEN existing_reaction = 1 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 1 THEN 1 ELSE 0 END),

        love_count = love_count
            - (CASE WHEN existing_reaction = 2 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 2 THEN 1 ELSE 0 END),

        haha_count = haha_count
            - (CASE WHEN existing_reaction = 3 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 3 THEN 1 ELSE 0 END),

        wow_count = wow_count
            - (CASE WHEN existing_reaction = 4 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 4 THEN 1 ELSE 0 END),

        sad_count = sad_count
            - (CASE WHEN existing_reaction = 5 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 5 THEN 1 ELSE 0 END),

        angry_count = angry_count
            - (CASE WHEN existing_reaction = 6 THEN 1 ELSE 0 END)
            + (CASE WHEN p_reaction_id   = 6 THEN 1 ELSE 0 END)

    WHERE id = p_comment_id;

    RETURN 'Reaction updated';
END;
$$ LANGUAGE plpgsql VOLATILE;


