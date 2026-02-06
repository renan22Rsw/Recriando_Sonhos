import Image from "next/image";
import SunFlowerParty from "@/public/sunflower-party.png";
import { Sparkle } from "lucide-react";

export const AboutPageSection1 = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src={SunFlowerParty}
                alt="sunflower-party"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="] flex w-40 items-center gap-2 rounded-3xl bg-[#F7EEDB] px-3 py-2 font-semibold">
              <Sparkle size={16} />
              Nossa Historia
            </span>
            <h2 className="text-xl font-bold md:text-3xl lg:text-4xl">
              Como Tudo Começou
            </h2>
            <div className="text-foreground/60 max-w-150 space-y-4 font-semibold">
              <p>
                A Recriando Sonhos nasceu de uma paixao genuina por celebracoes
                e do desejo de criar momentos inesqueciveis. Em 2017, o que
                comecou como um pequeno negocio familiar se transformou em uma
                referencia em decoracao de festas.
              </p>

              <p>
                Acreditamos que cada festa conta uma historia unica. Por isso,
                dedicamos tempo para entender os sonhos de cada cliente e
                transforma-los em decoracoes que superam expectativas.
              </p>

              <p>
                Hoje, temos orgulho de ter participado de mais de 500
                celebracoes, desde festas infantis magicas ate casamentos dos
                sonhos, sempre com o mesmo carinho e dedicacao do primeiro dia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
