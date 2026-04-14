"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type SpotifySignInButtonProps = React.ComponentProps<typeof Button>;

export function SpotifySignInButton({
  children,
  ...props
}: SpotifySignInButtonProps) {
  return (
    <Button
      {...props}
      onClick={() => signIn("spotify", { redirectTo: "/dashboard" })}
    >
      {children}
    </Button>
  );
}