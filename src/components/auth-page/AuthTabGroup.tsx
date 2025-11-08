import { Box, Tabs } from "@radix-ui/themes";
import { PillTab } from "./AuthTab";

export const AuthTabGroup = ({
  mode,
  onChange,
}: {
  mode: string;
  onChange: (v: string) => void;
}) => (
  <Box className="auth-tab-group">
    <Tabs.Root value={mode} onValueChange={onChange}>
      <Tabs.List>
        <PillTab
          value="signIn"
          isActive={mode === "signIn"}
          text="Iniciar Sesión"
        />
        <PillTab
          value="signUp"
          isActive={mode === "signUp"}
          text="Registrarse"
        />
      </Tabs.List>
    </Tabs.Root>
  </Box>
);
