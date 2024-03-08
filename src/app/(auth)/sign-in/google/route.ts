import { cookies } from "next/headers";
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth/lucia";
import { env } from "@/lib/env.mjs";


export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });
  console.log({ url, state, codeVerifier });
  cookies().set("state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  // store code verifier as cookie
  cookies().set("code_verifier", codeVerifier, {
    secure: true, // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });

  return Response.redirect(url);
}
