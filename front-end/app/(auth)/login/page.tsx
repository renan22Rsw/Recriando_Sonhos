import { AuthCard } from "../_components/auth-card";
import { AuthContainer } from "../_components/auth-container";
import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
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
