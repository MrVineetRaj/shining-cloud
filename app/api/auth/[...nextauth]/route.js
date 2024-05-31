
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const Handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});

export { Handler as GET, Handler as POST };
