// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__post-social-sessions",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.VERCEL_URL
          : undefined,
      expires: new Date(Date.now() + 600_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.COOKIES_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };
