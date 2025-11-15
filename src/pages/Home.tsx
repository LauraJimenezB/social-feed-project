import { Box, Flex } from "@radix-ui/themes";

import WelcomeBanner from "../components/home-page/WelcomeBanner";
import Post, { type PostType } from "../components/home-page/post/Post";
import PageLayout from "../components/layout/PageLayout";

const MOCK_POSTS: PostType[] = [
  {
    id: "1",
    author: { handle: "maria_g", avatarUrl: "" },
    timeAgo: "hace 289d",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    ],
    likes: 234,
    caption:
      "¡Increíbles vacaciones de verano! 🏖️⛰️🏙️ Desde la playa hasta las montañas y la ciudad. Cada momento fue perfecto.",
    hashtags: ["vacaciones", "verano", "travel", "memories"],
    commentsCount: 15,
  },
  {
    id: "2",
    author: { handle: "maria_g", avatarUrl: "" },
    timeAgo: "hace 289d",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    ],
    likes: 234,
    caption:
      "¡Increíbles vacaciones de verano! 🏖️⛰️🏙️ Desde la playa hasta las montañas y la ciudad. Cada momento fue perfecto.",
    hashtags: ["vacaciones", "verano", "travel", "memories"],
    commentsCount: 15,
  },
];

export default function Home() {
  return (
    <PageLayout showSearch>
      <WelcomeBanner />
      <Box asChild>
        <Flex direction="column" gap="5">
          {MOCK_POSTS.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </Flex>
      </Box>
    </PageLayout>
  );
}
