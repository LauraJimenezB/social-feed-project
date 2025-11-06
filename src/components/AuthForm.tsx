import { Box, Flex, Button, Callout } from "@radix-ui/themes";
import { useState } from "react";
import * as colors from "@radix-ui/colors";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { UserAuth } from "../context/AuthContext";
import { AuthField } from "./AuthField";

interface AuthFormProps {
  mode: "signIn" | "signUp";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const { signUp, signIn } = UserAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirm } = form;

    // Validation
    if (mode === "signUp") {
      if (!email || !password || !name)
        return setError("Todos los campos son obligatorios");

      if (password !== confirm) return setError("Las contraseñas no coinciden");
    } else if (!email || !password) {
      return setError("Por favor ingresa tu email y contraseña");
    }

    setLoading(true);

    try {
      const res =
        mode === "signUp"
          ? await signUp({ name, email, password })
          : await signIn({ email, password });

      if (!res?.success)
        return setError(res?.error?.message ?? "Error en la autenticación");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box asChild style={{ minHeight: 420 }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3" align="center">
          {mode === "signUp" && (
            <AuthField
              label="Nombre"
              icon={<PersonIcon />}
              value={form.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Tu nombre"
            />
          )}

          <AuthField
            label="Email"
            icon={<EnvelopeClosedIcon />}
            value={form.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="tu@email.com"
            type="email"
          />

          <AuthField
            label="Contraseña"
            icon={<LockClosedIcon />}
            value={form.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="•••••••"
            type="password"
          />

          {mode === "signUp" && (
            <AuthField
              label="Confirmar Contraseña"
              icon={<LockClosedIcon />}
              value={form.confirm}
              onChange={(value) => handleChange("confirm", value)}
              placeholder="•••••••"
              type="password"
            />
          )}

          {error && (
            <Callout.Root color="red" style={{ width: "100%" }}>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Button
            size="3"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: colors.gray.gray12,
              color: colors.gray.gray1,
              fontWeight: 600,
            }}
          >
            {mode === "signIn" ? "Iniciar Sesión" : "Crear Cuenta"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
