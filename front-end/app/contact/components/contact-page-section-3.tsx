import { MapPin } from "lucide-react";

export const ContactPageSection3 = () => {
  return (
    <section className="mx-auto px-4 py-14">
      <div className="space-y-2 py-4 text-center">
        <h3 className="text-4xl font-bold">Nossa Localizacao</h3>
        <p className="text-foreground/60 text-lg">
          Estamos localizados na Zona Sul de Sao Paulo, com facil acesso.
        </p>
      </div>

      <div className="mx-auto flex max-w-400 flex-col items-center space-y-4 rounded-2xl bg-[#F0EEEB] py-30">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-[#EEDCDA]">
          <MapPin color="#E85555" />
        </div>
        <p>Rio de Janeiro, Rj - Zona Oeste</p>
      </div>
    </section>
  );
};
