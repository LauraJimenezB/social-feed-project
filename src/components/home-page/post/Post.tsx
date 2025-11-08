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
} from "@radix-ui/react-icons";

export type PostType = {
  id: string;
  author: { handle: string; avatarUrl: string };
  timeAgo: string;
  images: string[];
  likes: number;
  caption: string;
  hashtags: string[];
  commentsCount: number;
};

export default function PostCard({ post }: { post: PostType }) {
  const mainImage = post.images[0];

  return (
    <Card size="3" variant="surface">
      {/* Header */}
      <Flex align="center" justify="between" px="3" py="2">
        <Flex align="center" gap="3">
          <Avatar
            src={post.author.avatarUrl}
            fallback={post.author.handle[0].toUpperCase()}
            size="3"
            radius="full"
          />
          <Box>
            <Text weight="medium">{post.author.handle}</Text>
            <Text as="div" size="1" color="gray">
              {post.timeAgo}
            </Text>
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
        <IconButton variant="ghost" radius="full" aria-label="Me gusta">
          <HeartIcon />
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
        <Text weight="bold">{post.likes} me gusta</Text>
        <Text as="p" mt="1">
          <Text weight="bold">{post.author.handle}</Text> {post.caption}
        </Text>

        <Box mt="2" style={{ lineHeight: 1.6 }}>
          {post.hashtags.map((h) => (
            <RLink key={h} href="#" mr="3" underline="always">
              #{h}
            </RLink>
          ))}
        </Box>

        <Text
          //as="button"
          style={{ all: "unset", color: "var(--gray-11)", cursor: "pointer" }}
          mt="2"
        >
          Ver los {post.commentsCount} comentarios
        </Text>
      </Box>
    </Card>
  );
}
