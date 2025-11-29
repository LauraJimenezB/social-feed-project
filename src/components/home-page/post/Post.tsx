import {
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  IconButton,
  Separator,
  Link as RLink,
} from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatBubbleIcon,
  Share2Icon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UseAuth } from "../../../context/AuthContext";
import { fetchLikes, likePost, unlikePost, type Likes } from "../../../api";

export type PostType = {
  id: string;
  user_name: string;
  created_at: string;
  image_url: string;
  likes: string[];
  description: string;
};

export default function PostCard({ post }: { post: PostType }) {
  const mainImage = post.image_url;
  const [likes, setLikes] = useState<Likes>([]);

  const { session } = UseAuth();

  const userLikesPost = useMemo(
    () => likes?.find((like) => like.user_id === session?.user.id),
    [likes, session]
  );

  const loadLikes = useCallback(async () => {
    const data = await fetchLikes(post.id);
    setLikes(data);
  }, [post.id]);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  const toggleLike = async () => {
    if (!session) return;

    try {
      if (userLikesPost) {
        await unlikePost(userLikesPost.id);
      } else {
        await likePost(session.user.id, post.id);
      }

      loadLikes();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card size="3" variant="surface">
      {/* Header */}
      <Flex align="center" justify="between" px="3" py="2">
        <Flex align="center" gap="3">
          <Avatar
            fallback={post?.user_name?.[0].toUpperCase()}
            size="3"
            radius="full"
          />
          <Box>
            <Text weight="medium">{post.user_name}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" radius="full" aria-label="Más opciones">
          <DotsHorizontalIcon />
        </IconButton>
      </Flex>

      {/* Image */}
      <Box
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--gray-3)",
        }}
      >
        <img
          src={mainImage}
          alt="post"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <Separator my="2" />

      {/* Actions */}
      <Flex align="center" gap="3" px="3" py="1">
        <IconButton
          variant="ghost"
          radius="full"
          aria-label="Me gusta"
          onClick={toggleLike}
        >
          {userLikesPost ? <HeartFilledIcon /> : <HeartIcon />}
        </IconButton>
        <IconButton variant="ghost" radius="full" aria-label="Comentar">
          <ChatBubbleIcon />
        </IconButton>
        <IconButton variant="ghost" radius="full" aria-label="Compartir">
          <Share2Icon />
        </IconButton>
      </Flex>

      {/* Meta */}
      <Box px="3" pb="3">
        <Text weight="bold">{likes.length} me gusta</Text>
        <Text as="p" mt="1">
          {post.description}
        </Text>
        <Text as="div" size="1" color="gray">
          {formattedDate}
        </Text>
      </Box>
    </Card>
  );
}
