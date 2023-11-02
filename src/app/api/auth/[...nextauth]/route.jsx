import NextAuth from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import GithubProviders from "next-auth/providers/github";
import FacebookProviders from "next-auth/providers/facebook";
const handler_ = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProviders({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProviders({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // 其他身份驗證提供者
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user);
      return true;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 額外的設定選項
});

export { handler_ as GET, handler_ as POST };
