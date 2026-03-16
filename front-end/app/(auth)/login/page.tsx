import { getSession } from "@/lib/api/get-session";
import { AuthCard } from "../_components/auth-card";
import { AuthContainer } from "../_components/auth-container";
import { LoginForm } from "./_components/login-form";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getSession();

  if (session && session.user.role) {
    redirect("/admin/dashboard");
  }

  if (session) {
    redirect("/profile");
  }

  return (
    <AuthContainer>
      <AuthCard
        title="Seja bem vindo de volta"
        description="Entre com suas credenciais para acessar sua conta"
        googleButtonText="Entrar com Google"
      >
        <LoginForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
