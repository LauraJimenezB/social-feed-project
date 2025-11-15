import { Box, Container, Flex, Theme } from "@radix-ui/themes";
import Header from "./Header";
import SearchBar from "./SearchBar";

export default function PageLayout({
  children,
  showSearch = false,
}: {
  children: React.ReactNode;
  showSearch?: boolean;
}) {
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
          inset: 0,
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
                {showSearch && <SearchBar />}
                {children}
              </Flex>
            </Container>
          </main>
        </Box>
      </Box>
    </Theme>
  );
}
