import { cookies } from "next/headers";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { google, lucia } from "@/lib/auth/lucia";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;
  console.log({ code, state, storedState, storedCodeVerifier });
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    console.log("invalid code or state");
    return new Response(null, {
      status: 400,
      headers: { Location: "/sign-in" },
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    console.log("TOKENS", { tokens });
    //GET USER INFO
    const googleUserRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser = await googleUserRes.json();
    console.log("GOOGLE USER", { googleUser });
    //CHECK IF USER EXISTS
    const checkUser = await db
      .select()
      .from(users)
      .where(eq(users.email, googleUser.email));

    const existingUser = checkUser[0];
    console.log("USER", { existingUser });
    const avatar = googleUser.picture ? googleUser.picture : "";
    //CREATE USER and session IF NOT EXISTS
    if (!existingUser) {
      console.log("creating new user");
      const userId = generateId(21);
      await db.insert(users).values({
        id: userId,
        oAuthProvider: "google",
        oAuthId: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar: avatar,
      });
      console.log("USER CREATED in DB", { userId });
      const session = await lucia.createSession(userId, {});
      console.log("SESSION CREATED", { session });
      const sessionCookie = lucia.createSessionCookie(session.id);
      console.log("SESSION COOKIE SETTED", { sessionCookie });
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: { Location: "/dashboard" },
      });
    }
    // UPDATE USER IF EXISTS
    if (existingUser.oAuthId !== googleUser.sub) {
      console.log("updating user");
      await db
        .update(users)
        .set({
          oAuthId: googleUser.id,
          oAuthProvider: "google",
          avatar: avatar,
        })
        .where(eq(users.id, existingUser.id));
    }
    //CREATE SESSION if user exists
    const session = await lucia.createSession(existingUser.id, {});
    console.log("SESSION CREATED", { session });
    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log("SESSION COOKIE SETTED", { sessionCookie });
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard" },
    });
  } catch (e) {
    console.log("ERROR", { e });
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        message: {
          message: e,
          status: 500,
        },
      }),
      {
        status: 500,
      }
    );
  }
}
