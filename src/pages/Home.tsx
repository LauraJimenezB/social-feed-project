import { Box, Flex, Text } from "@radix-ui/themes";

import WelcomeBanner from "../components/home-page/WelcomeBanner";
import Post, { type PostType } from "../components/home-page/post/Post";
import PageLayout from "../components/layout/PageLayout";
import { useEffect, useState } from "react";
import { fetchPosts } from "../api";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts();

        setPosts(data);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar posts");
      } finally {
      }
    };

    load();
  }, []);

  return (
    <PageLayout showSearch>
      <WelcomeBanner />
      <Box asChild>
        <Flex direction="column" gap="5">
          {error && <Text>Error al cargar los posts</Text>}
          {posts.length === 0 ? (
            <Text>No hay posts</Text>
          ) : (
            posts?.map((p) => <Post key={p.id} post={p} />)
          )}
        </Flex>
      </Box>
    </PageLayout>
  );
}
