import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Theme,
  Text,
  Tabs,
  TextField,
  Button,
} from "@radix-ui/themes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Mode = "signIn" | "signUp";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMode: Mode = location.pathname.includes("signUp")
    ? "signUp"
    : "signIn";

  const [mode, setMode] = useState<Mode>(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleTabChange = (value: string) => {
    setMode(value as Mode);
    navigate(`/${value}`); // 👈 will route to /signIn or /signUp
  };

  return (
    <Theme
      appearance="light"
      accentColor="indigo"
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
            {/* Reserve height to avoid jump (Box #2) */}
            <Box mb="4" style={{ textAlign: "center" }}>
              <Heading size="8">Bienvenido a SocialFeed</Heading>
              <Text as="p" size="4" color="gray" mt="2">
                Inicia sesión o crea una cuenta para comenzar
              </Text>
            </Box>

            {/* Tabs header styled like a pill */}
            <Box
              mb="4"
              p="1"
              style={{
                background: "var(--gray-a3)",
                borderRadius: 9999,
              }}
            >
              <Tabs.Root value={mode} onValueChange={handleTabChange}>
                <Tabs.List className="auth-tabs" wrap="nowrap">
                  <Tabs.Trigger
                    value="signIn"
                    style={{
                      flex: 1,
                      background: mode === "signIn" ? "#fff" : "transparent",
                      color: mode === "signIn" ? "#000" : "var(--gray-11)", // 👈 override to black (or your color)

                      borderRadius: 9999,
                      transition: "all .2s ease",
                    }}
                  >
                    Iniciar Sesión
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="signUp"
                    style={{
                      flex: 1,
                      background: mode === "signUp" ? "#fff" : "transparent",
                      color: mode === "signUp" ? "#000" : "var(--gray-11)",
                      borderRadius: 9999,
                      transition: "all .2s ease",
                    }}
                  >
                    Registrarse
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </Box>

            <Box asChild style={{ minHeight: 420 }}>
              <form
                onSubmit={() => {
                  console.log("submit");
                }}
              >
                <Flex direction="column" gap="3" align="center">
                  {mode === "signUp" && (
                    <Box
                      style={{
                        textAlign: "left",
                        width: "100%",
                        maxWidth: 560,
                      }}
                    >
                      <Text as="label" size="3" weight="medium">
                        Nombre
                      </Text>
                      <TextField.Root
                        mt="1"
                        size="3"
                        radius="large"
                        variant="soft"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                      >
                        <TextField.Slot>
                          <PersonIcon />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>
                  )}

                  <Box
                    style={{
                      textAlign: "left",
                      width: "100%",
                      maxWidth: 560,
                    }}
                  >
                    <Text as="label" size="3" weight="medium">
                      Email
                    </Text>
                    <TextField.Root
                      mt="1"
                      size="3"
                      radius="large"
                      variant="soft"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      type="email"
                    >
                      <TextField.Slot>
                        <EnvelopeClosedIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Box>

                  <Box
                    style={{
                      textAlign: "left",
                      width: "100%",
                      maxWidth: 560,
                    }}
                  >
                    <Text as="label" size="3" weight="medium">
                      Contraseña
                    </Text>
                    <TextField.Root
                      mt="1"
                      size="3"
                      radius="large"
                      variant="soft"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••"
                      type="password"
                    >
                      <TextField.Slot>
                        <LockClosedIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Box>

                  {mode === "signUp" && (
                    <Box
                      style={{
                        textAlign: "left",
                        width: "100%",
                        maxWidth: 560,
                      }}
                    >
                      <Text as="label" size="3" weight="medium">
                        Confirmar Contraseña
                      </Text>
                      <TextField.Root
                        mt="1"
                        size="3"
                        radius="large"
                        variant="soft"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="•••••••"
                        type="password"
                      >
                        <TextField.Slot>
                          <LockClosedIcon />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>
                  )}

                  <Button size="3" type="submit" disabled>
                    {mode === "signIn" ? "Iniciar Sesión" : "Crear Cuenta"}
                  </Button>
                </Flex>
              </form>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Theme>
  );
};

export default AuthPage;
