import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"

async function refreshSpotifyToken(refreshToken: string) {
  const clientId = process.env.AUTH_SPOTIFY_ID!;
  const clientSecret = process.env.AUTH_SPOTIFY_SECRET!;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  return response.json() as Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }>;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          scope: [
            "user-read-email",
            "user-read-private",
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-private",
            "playlist-modify-public",
          ].join(" "),
        }).toString(),
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Premier login : stocker le token et sa date d'expiration
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;
        return token;
      }

      // Token encore valide (avec 60s de marge)
      if (Date.now() < (token.expiresAt as number) - 60_000) {
        return token;
      }

      // Token expiré : on tente le refresh
      if (!token.refreshToken) return token;

      try {
        const refreshed = await refreshSpotifyToken(token.refreshToken as string);
        token.accessToken = refreshed.access_token;
        token.expiresAt = Date.now() + refreshed.expires_in * 1000;
        if (refreshed.refresh_token) {
          token.refreshToken = refreshed.refresh_token;
        }
      } catch (err) {
        console.error("Spotify token refresh failed:", err);
        token.error = "RefreshTokenError";
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      return session;
    },
  },
})