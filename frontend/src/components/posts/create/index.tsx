import { FC, useEffect, useState } from "react";
import { TextAreaSection } from "./textAreaSection";
import { ActionButtons } from "./actionButtons";
import { useCreatePost, useUpdatePost } from "../../../hooks/reactQuery/posts";
import { ty_post_item } from "../../../types/post.type";

interface IComp {
  post?: ty_post_item;
  onClose?: () => void;
  cursor: string|null;
}

export const CreatePost: FC<IComp> = ({ post, onClose, cursor }) => {
  const isEdit = !!post;

  const [content, setContent] = useState(post?.content ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(post?.is_public ?? true);

  const createMutation = useCreatePost({
    successHandler: () => {
      setContent("");
      setFile(null);
      setIsPublic(true);
    },
  },
    cursor
);

  const updateMutation = useUpdatePost({
    successHandler: () => {
      // setContent("");
      // setFile(null);
      // setIsPublic(true);
    },
  },
    cursor
);

  // 🔥 Sync fields whenever a new post is passed in
  useEffect(() => {
    if (post) {
      setContent(post.content ?? "");
      setIsPublic(post.is_public ?? true);
      setFile(null);
    }
  }, [post]);


  const handleSubmit = () => {
    if (isEdit) {
      updateMutation.mutate({
        id: post.id,
        content,
        file,
        is_public: isPublic,
      });
    } else {
      createMutation.mutate({
        content,
        file,
        is_public: isPublic,
      });
    }
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <h5 className="mb-3">{isEdit ? "Edit Post" : "Create Post"}</h5>

      <TextAreaSection
        content={content}
        setContent={setContent}
        file={file}
        setFile={setFile}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        // existingImageUrl={post?.image_url}
      />

      <ActionButtons
        setFile={setFile}
        handleSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
