"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signInAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";
import { AnimatedSpinner, GoogleLogo } from "@/components/icons";
import { Input } from "@/components/ui/input";


export default function SignInPage() {
  const [state, formAction] = useFormState(signInAction, {
    error: "",
  });

  return (
    <main className="min-w-96 max-w-2xl mx-auto my-4 bg-card-foreground/20 backdrop-blur-md p-10 rounded-xl flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">
        Inicia sesion en YourMarket
      </h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input name="email" id="email" type="email" required />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          Contraseña
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />
        <div className="flex flex-col items-center justify-center gap-4">
          <Button variant="outline" className="w-full hover:scale-95" asChild>
            <Link href="/sign-in/google">
              <GoogleLogo className="mr-2 h-5 w-5" />
              Inicia sesion con Google
            </Link>
          </Button>
          <SubmitButton />
        </div>
      </form>
      <div className="mt-4 text-sm text-center text-muted-foreground">
        No tienes una cuenta?{" "}
        <Link
          href="/sign-up"
          className="text-accent-foreground underline hover:text-primary"
        >
          Registrate
        </Link>
      </div>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full hover:scale-95" type="submit" disabled={pending}>
      {pending ? <AnimatedSpinner /> : "Iniciar Sesion"}
    </Button>
  );
};
