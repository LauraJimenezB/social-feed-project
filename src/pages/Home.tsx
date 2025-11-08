import { Box, Container, Flex, Theme } from "@radix-ui/themes";

import WelcomeBanner from "../components/home-page/WelcomeBanner";
import Post, { type PostType } from "../components/home-page/post/Post";
import Header from "../components/home-page/Header";
import SearchBar from "../components/home-page/SearchBar";

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
    <Theme
      appearance="light"
      accentColor="gray"
      grayColor="slate"
      radius="large"
    >
      <Box
        style={{
          position: "fixed",
          inset: 0, // top:0 right:0 bottom:0 left:0
          display: "flex",
          flexDirection: "column",
          background: "#fff",
        }}
      >
        <Header />
        <Box
          asChild
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <main>
            <Container size="3">
              <Flex direction="column" gap="4" my="4">
                <SearchBar />
                <WelcomeBanner />
                <Box asChild>
                  <Flex direction="column" gap="5">
                    {MOCK_POSTS.map((p) => (
                      <Post key={p.id} post={p} />
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </main>
        </Box>
      </Box>
    </Theme>
  );
}
