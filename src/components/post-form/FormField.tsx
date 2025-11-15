import { Box, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

interface Props {
  label: string;
  name: string;
  children: React.ReactNode;
  errorMessage?: string;
}

export const FormField = ({ label, name, children, errorMessage }: Props) => (
  <Form.Field name={name}>
    <Box className="form-field">
      <Form.Label asChild>
        <Text weight="medium">{label}</Text>
      </Form.Label>
      <Form.Control asChild>{children}</Form.Control>
      {errorMessage && (
        <Form.Message match="valueMissing" className="form-message">
          {errorMessage}
        </Form.Message>
      )}
    </Box>
  </Form.Field>
);
