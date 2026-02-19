import { Header } from "@/components/header";
import { AboutPageSection1 } from "./components/about-page-section-1";
import { AboutPageSection2 } from "./components/about-page-section-2";
import { AboutPageSection3 } from "./components/about-page-section-3";
import { AboutPageSection4 } from "./components/about-page-section-4";
import { Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Header
        title="Transformando em Realidade"
        colorText="Sonhos"
        description=" Ha mais de 8 anos, a Recriando Sonhos tem o privilegio de fazer parte
          dos momentos mais especiais de nossos clientes, criando decoracoes que
          encantam e emocionam."
        icon={Heart}
        size={16}
        iconLabel="Nossa História"
      />
      <AboutPageSection1 />
      <AboutPageSection2 />
      <AboutPageSection3 />
      <AboutPageSection4 />
    </>
  );
};

export default AboutPage;
