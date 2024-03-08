"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signUpAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";
import { AnimatedSpinner, GoogleLogo } from "@/components/icons";

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUpAction, {
    error: "",
  });

  return (
    <main className="max-w-lg mx-auto my-4 bg-popover p-10">
      <h1 className="text-2xl font-bold text-center">Crea una cuenta</h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input name="email" type="email" id="email" required />
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
              Crear cuenta con Google
            </Link>
          </Button>
          <SubmitButton />
        </div>
      </form>
      <div className="mt-4 text-muted-foreground text-center text-sm">
        Ya tienes cuenta?{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          Inicia sesion
        </Link>
      </div>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? <AnimatedSpinner /> : "Crear Cuenta"}
    </Button>
  );
};
