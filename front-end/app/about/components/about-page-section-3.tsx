import { Sparkles } from "lucide-react";
import BithdayParty from "@/public/birthday-party.png";
import SunFlowerParty from "@/public/sunflower-party.png";
import Image from "next/image";

export const AboutPageSection3 = () => {
  return (
    <section className="bg-[#F4F3F1] py-24">
      <div className="flex flex-col items-center space-y-4 px-2 py-24">
        <span className="flex items-center gap-2 rounded-3xl bg-[#F6E5E4] px-3 py-2 font-semibold text-[#E85555]">
          <Sparkles size={16} />
          Nossos Trabalhos
        </span>

        <h4 className="text-lg font-semibold md:text-3xl lg:text-4xl">
          Momentos que Criamos
        </h4>
        <p className="text-foreground/60 text-md max-w-190 text-center font-semibold">
          Cada decoracao e uma obra de arte unica, feita com amor e dedicacao.
        </p>
      </div>

      <div className="mx-auto grid gap-6 px-4 md:grid-cols-2 2xl:max-w-350">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={BithdayParty}
            alt="birthday-party"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={SunFlowerParty}
            alt="sunflower-party"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};
