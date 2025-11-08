import { Callout, Link as RLink } from "@radix-ui/themes";
import { UseAuth } from "../../context/AuthContext";

export default function WelcomeBanner() {
  const { session } = UseAuth();

  const name = session?.user?.user_metadata?.name;

  return (
    <Callout.Root size="3" variant="soft" color="indigo">
      {!session ? (
        <Callout.Text>
          <strong>¡Únete a SocialFeed!</strong>
          <br />
          Inicia sesión para dar like, comentar y crear tus propios posts.
          <br />
          <RLink href="#" underline="always">
            Demo: maria_g / demo123
          </RLink>
        </Callout.Text>
      ) : (
        <Callout.Text> Hola, {name} 👋</Callout.Text>
      )}
    </Callout.Root>
  );
}
