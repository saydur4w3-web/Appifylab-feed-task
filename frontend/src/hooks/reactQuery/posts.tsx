// hooks/useCreatePost.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../utils/fetch";
import { ty_rkMutation } from "../../types/general.type";
import { toast } from "sonner";
import { ty_posts_api_res } from "../../types/post.type";

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

export function useCreatePost({successHandler}: ty_rkMutation) {

  const queryClient = useQueryClient();


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
      queryClient.invalidateQueries({ queryKey: ["post", "list"] });
    },

    onError: () => {
      toast.error('Failed to create post');
    }

  })

}


export const usePostGetAll = (cursor: string | null) => {


  const url = cursor ? `/posts?cursor=${cursor}` : "/posts";

  const fetchFunc = () =>
    Fetch({
      url,
    });

  const query = useQuery({
    queryKey: ["post", "list", cursor], // refetch when cursor changes
    queryFn: fetchFunc,
    // keepPreviousData: true,
  });

  return {
    ...query,
    data: query.data as ty_posts_api_res
  };
};



export function useUpdatePost({ successHandler }: ty_rkMutation) {

  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async ({
      id,
      content,
      file,
      is_public,
    }: {
      id: string
      content?: string;
      file?: File | null;
      is_public: boolean;
    }) => {
      let image_url: string | undefined = undefined;

      if (file) {
        const uploaded = await uploadImage(file);
        image_url = uploaded.url;
      }

      return await Fetch({
        url: `/posts/${id}`,
        method: "PATCH",
        data: {
          content,
          image_url,
          is_public,
        },
      });
    },

    onSuccess: () => {
      successHandler();
      queryClient.invalidateQueries({ queryKey: ["post", "list"] });
    },

    onError: () => {
      toast.error("Failed to update post");
    },
  });
}



export function useDeletePost() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await Fetch({
        url: `/posts/${id}`,
        method: "DELETE",
      });
    },

    onSuccess: () => {
      toast.success("Post delted");
      queryClient.invalidateQueries({ queryKey: ["post", "list"] });
    },

    onError: () => {
      toast.error("Failed to delete post");
    },
  });
}