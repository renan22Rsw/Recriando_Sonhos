"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);
  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  const handleVerifyEmail = async () => {
    if (!email) {
      toast.error("Email não encontrado");
      return;
    }

    setLoading(true);

    await authClient.sendVerificationEmail({
      email,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Email enviado com sucesso", {
            description: "Por favor verifique seu email",
          });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, {
            description: "Por favor tente novamente",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      },
    });
  };

  if (!email) return null;

  return (
    <div className="flex w-full items-center justify-center px-4 py-40">
      <div className="flex w-150 flex-col items-center rounded-xl bg-[#F9F8F7] shadow-lg">
        <div className="flex h-24 w-full items-center justify-center rounded-t-xl bg-[#E64343]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <Mail size={30} color="#E64343" />
          </div>
        </div>

        <div className="space-y-6 p-10 text-center">
          <h1 className="text-2xl font-semibold">Verificação de email</h1>

          <p className="text-muted-foreground">Enviamos um email para:</p>

          <p className="text-lg font-bold">{email}</p>

          <Button
            disabled={loading}
            onClick={handleVerifyEmail}
            className="cursor-pointer bg-[#E64343] font-bold hover:bg-[#E64343]/80"
          >
            {loading ? "Enviando..." : "Reenviar email"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
