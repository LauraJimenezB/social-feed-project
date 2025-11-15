import { Box, TextArea, Theme, Text, Button } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { supabase } from "../../../supabaseClient";
import { FormField } from "./FormField";

export default function PostForm() {
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = UseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!session) {
        setError("Debes iniciar sesión");
        return;
      }

      // ---- Upload file ----
      const filePath = `${imageFile?.name}-${Date.now()}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        setError("No se pudo subir la imagen");
        return;
      }

      // ---- Get public URL ----
      const { data: urlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      // ---- Insert post ----
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: session.user.id,
        description,
        image_url: urlData.publicUrl,
      });

      if (insertError) {
        setError("No se pudo crear el post");
        return;
      }

      // success: clear form
      setDescription("");
      setImageFile(null);
      setFileKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Theme
      appearance="light"
      accentColor="gray"
      grayColor="slate"
      radius="large"
    >
      <Box className="post-form-container">
        {error && <Text color="red">{error}</Text>}
        <Form.Root onSubmit={handleSubmit}>
          <FormField
            label="Descripción"
            name="description"
            errorMessage="Agrega una descripción"
          >
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              required
              rows={3}
            />
          </FormField>

          <FormField
            label="Imagen"
            name="image"
            errorMessage="Selecciona una imagen"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              required
              key={fileKey}
            />
          </FormField>

          <Form.Submit asChild>
            <Button type="submit" size="3" className="submit-button">
              {loading ? "Cargando..." : "Compartir"}
            </Button>
          </Form.Submit>
        </Form.Root>
      </Box>
    </Theme>
  );
}
