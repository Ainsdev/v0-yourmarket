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
    //GET USER INFO
    const googleUserRes = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser = (await googleUserRes.json());
    //CHECK IF USER EXISTS
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, googleUser.email));

    const user = existingUser[0];

    // const avatar = googleUser.picture ? googleUser.picture : null;
    //CREATE USER and session IF NOT EXISTS
    if (!user) {
      const userId = generateId(21);
      await db.insert(users).values({
        id: userId,
        oAuthProvider: "google",
        oAuthId: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
        // avatar,
      });
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
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
    //
    if (user.oAuthId !== googleUser.sub && user.oAuthProvider !== "google") {
      await db
        .update(users)
        .set({
          oAuthId: googleUser.sub,
          oAuthProvider: "google",
        })
        .where(eq(users.id, user.id));
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
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
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
}

