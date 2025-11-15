import { Box, Container, Flex, Button, Text } from "@radix-ui/themes";
import {
  ExitIcon,
  PersonIcon,
  HomeIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

export default function Header() {
  const { session, signOut } = UseAuth();
  const navigate = useNavigate();

  return (
    <Box
      style={{
        width: "100%",
        background: "white",
        borderBottom: "1px solid var(--gray-a4)",
      }}
    >
      <Container size="3" py="2">
        <Flex align="center" justify="between">
          <Text weight="bold" size="5" color="indigo">
            SocialFeed
          </Text>
          {session ? (
            <Flex gap="2">
              <Button
                size="2"
                onClick={() => navigate("/")}
                color="indigo"
                variant="soft"
              >
                <HomeIcon /> Home
              </Button>
              <Button
                size="2"
                onClick={() => navigate("/post")}
                color="indigo"
                variant="soft"
              >
                <Pencil2Icon /> Post
              </Button>
              <Button
                size="2"
                style={{ background: "black", color: "white" }}
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
              >
                <ExitIcon /> Cerrar Sesión
              </Button>
            </Flex>
          ) : (
            <Button
              asChild
              size="2"
              style={{ background: "black", color: "white" }}
            >
              <Link to="/signIn">
                <PersonIcon /> Iniciar Sesión
              </Link>
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
