import { Box, Text, TextField } from "@radix-ui/themes";
import * as colors from "@radix-ui/colors";
import type { ReactNode } from "react";

interface AuthFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "email" | "password";
  icon?: ReactNode;
}

export const AuthField = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  icon,
}: AuthFieldProps) => (
  <Box style={{ width: "100%", textAlign: "left" }}>
    <Text as="label" size="3" weight="medium">
      {label}
    </Text>
    <TextField.Root
      mt="1"
      size="3"
      radius="large"
      variant="soft"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      style={{
        backgroundColor: colors.gray.gray2,
        borderColor: colors.gray.gray6,
        color: colors.gray.gray12,
      }}
    >
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
    </TextField.Root>
  </Box>
);
