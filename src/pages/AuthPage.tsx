import { Box, Container, Flex, Heading, Theme, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthTabGroup } from "../components/auth-page/AuthTabGroup";
import { AuthForm } from "../components/auth-page/AuthForm";

export type Mode = "signIn" | "signUp";

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
        <Flex justify="center" align="center" className="auth-page">
          <Box className="auth-box">
            <Heading size="8">Bienvenido a SocialFeed</Heading>
            <Text as="p" size="4" color="gray" mt="2">
              Inicia sesión o crea una cuenta para comenzar
            </Text>

            <AuthTabGroup mode={mode} onChange={handleTabChange} />
            <AuthForm mode={mode} />
          </Box>
        </Flex>
      </Container>
    </Theme>
  );
};

export default AuthPage;
