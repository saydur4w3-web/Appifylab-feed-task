// hooks/useCreatePost.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../utils/fetch";
import { ty_rkMutation } from "../../types/general.type";
import { toast } from "sonner";
import { ty_post_item, ty_posts_api_res } from "../../types/post.type";
import { ty_GetReactionsResponse } from "../../types/reactions.type";

async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await Fetch<{ url: string }>({
    url: "/upload/image",
    method: "POST",
    form,
  });

  return res;
}

async function createPost(data: {
  content?: string;
  image_url?: string;
  is_public: boolean;
}) {
  return await Fetch({
    url: "/posts",
    method: "POST",
    data,
  });
}

export function useCreatePost({ successHandler }: ty_rkMutation) {
  return useMutation({
    mutationFn: async ({
      content,
      file,
      is_public,
    }: {
      content?: string;
      file?: File | null;
      is_public: boolean;
    }) => {
      let image_url = undefined;

      if (file) {
        const uploaded = await uploadImage(file);
        image_url = uploaded.url;
      }

      return await createPost({
        content,
        image_url,
        is_public,
      });
    },

    onSuccess: () => {
      successHandler();
    },

    onError: () => {
      toast.error("Failed to create post");
    },
  });
}

interface UseGetReactionsArgs {
  id: string;
  page?: number;
  reactionId?: number | "all";
  type: "post" | "comment";
}

export const useGetReactions = ({
  id,
  page = 1,
  reactionId = "all",
  type,
}: UseGetReactionsArgs) => {
  const endpoint =
    type === "post"
      ? `/reaction/post/${id}?page=${page}${
          reactionId !== "all" ? `&reactionId=${reactionId}` : ""
        }`
      : `/reaction/comment/${id}?page=${page}${
          reactionId !== "all" ? `&reactionId=${reactionId}` : ""
        }`;

  const query = useQuery({
    queryKey: ["reactions", type, id, page, reactionId],
    queryFn: () => Fetch({ url: endpoint }),
    enabled: !!id, // prevents calling before id is available
  });

  return {
    ...query,
    data: query.data as ty_GetReactionsResponse,
  };
};

export function useCreateReactPost() {
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (dt: { postId: string; reactionId: number | null }) => {
      return Fetch({
        url: "/reaction/post",
        method: "PATCH",
        data: { postId: dt.postId, reactionId: dt.reactionId },
      });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["post", "list"] });
    },
  });

  return mutation;
}



export function useCreateReactComment() {
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (dt: { commentId: string; reactionId: number | null }) => {
      return Fetch({
        url: "/reaction/comment",
        method: "PATCH",
        data: { commentId: dt.commentId, reactionId: dt.reactionId },
      });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["post", "list"] });
    },
  });

  return mutation;
}
