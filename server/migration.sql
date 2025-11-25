-- Users table
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           CITEXT UNIQUE NOT NULL,
    display_name    VARCHAR(100),
    bio             TEXT,
    avatar_url      TEXT,
    password_hash   TEXT NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    
);

-- Follows (who follows whom)
CREATE TABLE follows (
    follower_id  UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id <> following_id)
);

-- Posts
CREATE TABLE posts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content         TEXT NOT NULL,
    image_url       TEXT,                    -- optional image
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE reaction_types (
    id      SMALLINT PRIMARY KEY,
    name    VARCHAR(20) UNIQUE NOT NULL,  -- 'love', 'haha', 'like', etc.
);

-- Likes (on posts)
CREATE TABLE post_likes (
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id     UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    reaction_id   SMALLINT NOT NULL REFERENCES reaction_types(id),
    
    PRIMARY KEY (user_id, post_id)
);

-- Comments (on posts)
CREATE TABLE comments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id     UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    comment_id UUID REFERENCES comments(id) ON DELETE SET NULL, -- nested replies
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Comment likes (if you want to like comments too)
CREATE TABLE comment_likes (
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    comment_id   UUID REFERENCES comments(id) ON DELETE CASCADE,
    reaction_id   SMALLINT NOT NULL REFERENCES reaction_types(id),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, comment_id)
);

-- Notifications (likes, comments, follows, mentions)
CREATE TABLE notifications (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    actor_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type          VARCHAR(20) NOT NULL CHECK (type IN (
        'like', 'comment', 'follow', 'mention', 'repost'
    )),
    post_id       UUID REFERENCES posts(id) ON DELETE CASCADE,
    comment_id    UUID REFERENCES comments(id) ON DELETE CASCADE,
    read          BOOLEAN DEFAULT false,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);