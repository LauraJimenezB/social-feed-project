import { Box, Tabs } from "@radix-ui/themes";

export type Mode = "signIn" | "signUp";

interface AuthTabsProps {
  mode: Mode;
  onChange: (value: string) => void;
}

export const AuthTabs = ({ mode, onChange }: AuthTabsProps) => (
  <Box
    mb="4"
    p="1"
    style={{ background: "var(--gray-a3)", borderRadius: 9999 }}
  >
    <Tabs.Root value={mode} onValueChange={onChange}>
      <Tabs.List>
        <Tabs.Trigger
          value="signIn"
          style={{
            flex: 1,
            background: mode === "signIn" ? "#fff" : "transparent",
            color: mode === "signIn" ? "#000" : "var(--gray-11)",
            borderRadius: 9999,
            fontWeight: "bold",
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
            fontWeight: "bold",
          }}
        >
          Registrarse
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </Box>
);
