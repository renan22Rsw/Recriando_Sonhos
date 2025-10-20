import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin } from "better-auth/plugins";
import { sendEmail } from "../utils/send-email-verification";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, token }) => {
      try {
        const frontendUrl = process.env.ORIGIN_URL as string;
        const backendUrl = process.env.BACKEND_URL as string;

        await sendEmail({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Verify your email adress",
          html: `Click the link to verify your email: ${backendUrl}/api/auth/verify-email?token=${token}&callbackURL=${frontendUrl}/profile`,
        });

        console.log("Email sent successfully!");
      } catch (err) {
        console.log("Something went wrong", err);
        throw err;
      }
    },
  },

  session: {
    expiresIn: 7 * 24 * 60 * 60,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLINET_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [admin()],

  trustedOrigins: [process.env.ORIGIN_URL as string],
  secret: process.env.BETTER_AUTH_SECRET,
});
