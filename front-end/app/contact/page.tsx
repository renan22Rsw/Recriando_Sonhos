import { Header } from "@/components/header";
import { MessageCircle } from "lucide-react";
import { ContactPageSection1 } from "./components/contact-page-section-1";
import { ContactPageSection2 } from "./components/contact-page-section-2";
import { ContactPageSection3 } from "./components/contact-page-section-3";

const ContactPage = () => {
  return (
    <>
      <Header
        title="Vamos Criar Algo Incrivel Juntos"
        description="Estamos aqui para ajudar a tornar sua celebracao inesquecivel. Entre em contato e conte-nos sobre seu projeto dos sonhos."
        colorText="Incrivel"
        icon={MessageCircle}
        size={16}
        iconLabel="Fale Conosco"
      />

      <ContactPageSection1 />
      <ContactPageSection2 />
      <ContactPageSection3 />
    </>
  );
};

export default ContactPage;
