import { supabase } from "../supabaseClient";

/* ------------------------ FETCH POSTS ------------------------ */
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

/* ------------------------ FETCH LIKES ------------------------ */
export const fetchLikes = async (postId: string) => {
  const { data, error } = await supabase
    .from("post_likes")
    .select("user_id, id")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);

  return data;
};

export type Likes = Awaited<ReturnType<typeof fetchLikes>>;
export type Like = Likes[number];

/* ------------------------ LIKE ------------------------ */
export const likePost = async (userId: string, postId: string) => {
  const { error } = await supabase.from("post_likes").insert({
    user_id: userId,
    post_id: postId,
  });

  if (error) throw new Error(error.message);
};

/* ------------------------ REMOVE LIKE ------------------------ */
export const unlikePost = async (likeId: string) => {
  const { error } = await supabase.from("post_likes").delete().eq("id", likeId);

  if (error) throw new Error(error.message);
};
