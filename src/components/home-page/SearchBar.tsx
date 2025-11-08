import { Flex, TextField, IconButton } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

export default function SearchBar() {
  return (
    <Flex align="center" gap="2">
      <TextField.Root
        placeholder="Buscar posts, usuarios o hashtags..."
        size="3"
        radius="full"
        variant="soft"
        style={{ flex: 1 }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
      </TextField.Root>

      <IconButton
        size="3"
        variant="soft"
        radius="full"
        aria-label="Filtros"
        style={{ minWidth: 44 }}
      >
        <MixerHorizontalIcon />
      </IconButton>
    </Flex>
  );
}
