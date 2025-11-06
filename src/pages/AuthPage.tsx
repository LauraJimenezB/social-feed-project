import { Box, Container, Flex, Heading, Theme, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthTabs, type Mode } from "../components/AuthTabs";
import { AuthForm } from "../components/AuthForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMode: Mode = location.pathname.includes("signUp")
    ? "signUp"
    : "signIn";

  const [mode, setMode] = useState<Mode>(initialMode);

  const handleTabChange = (value: string) => {
    setMode(value as Mode);
    navigate(`/${value}`);
  };

  return (
    <Theme
      appearance="light"
      accentColor="gray"
      grayColor="slate"
      panelBackground="solid"
      radius="large"
    >
      <Container size="2" px={{ initial: "4", sm: "6" }}>
        <Flex
          align="center"
          direction="column"
          justify="center"
          style={{ minHeight: "100svh" }}
        >
          <Box style={{ width: "100%", maxWidth: 560 }}>
            <Box mb="4" style={{ textAlign: "center" }}>
              <Heading size="8">Bienvenido a SocialFeed</Heading>
              <Text as="p" size="4" color="gray" mt="2">
                Inicia sesión o crea una cuenta para comenzar
              </Text>
            </Box>

            <AuthTabs mode={mode} onChange={handleTabChange} />
            <AuthForm mode={mode} />
          </Box>
        </Flex>
      </Container>
    </Theme>
  );
};

export default AuthPage;
