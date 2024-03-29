"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signInAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";
import { AnimatedSpinner, GoogleLogo } from "@/components/icons";
import { Input } from "@/components/animated/ui/input";

export default function SignInPage() {
  const [state, formAction] = useFormState(signInAction, {
    error: "",
  });

  return (
    <main className="max-w-lg mx-auto my-4 bg-popover p-10">
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
          <Button variant="outline" className="w-full" asChild>
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
    <Button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit"
      disabled={pending}
    >
      {pending ? <AnimatedSpinner /> : "Iniciar Sesion"}
    </Button>
  );
};
