import { AuthContainer } from "../_components/auth-container";
import { AuthCard } from "../_components/auth-card";
import { SignUpForm } from "./_components/signup-form";

const SignUpPage = () => {
  return (
    <AuthContainer>
      <AuthCard
        title="Criar conta"
        description="Preencha os dados abaixo para criar sua conta"
        googleButtonText="Continuar com Google"
      >
        <SignUpForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default SignUpPage;
