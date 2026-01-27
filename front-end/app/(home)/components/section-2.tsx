import Image from "next/image";

import UnicornParty from "@/public/unicorn-party.png";
import SunFlowerParty from "@/public/sunflower-party.png";
import BithdayParty from "@/public/birthday-party.png";

const prodcuts = [
  {
    id: 1,
    name: "Unicorn Party",
    image: UnicornParty,
  },
  {
    id: 2,
    name: "Sunflower Party",
    image: SunFlowerParty,
  },
  {
    id: 3,
    name: "Bithday Party",
    image: BithdayParty,
  },
];

export const Section2 = () => {
  return (
    <section className="bg-[#F4F3F1]">
      <div className="space-y-4 pt-32 text-center">
        <span className="text-lg font-semibold text-[#E85555]">
          Nossos Serviços
        </span>
        <h1 className="text-5xl font-bold">Tudo para sua Festa</h1>
        <p className="text-secondary-foreground/60 px-6 text-2xl font-medium">
          Oferecemos solucoes completas em decoracao para todos os tipos de{" "}
          eventos e celebracoes
        </p>
      </div>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-[repeat(auto-fit,minmax(280px,420px))] justify-center gap-8 px-8 py-8">
        {prodcuts.map((prodcuts) => (
          <div
            key={prodcuts.id}
            className="relative aspect-4/3 w-full max-w-[420px] overflow-hidden rounded-2xl"
          >
            <Image
              src={prodcuts.image}
              alt={prodcuts.name}
              fill
              className="rounded-2xl object-cover transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
              priority
            />

            <div className="from-foreground/80 absolute bottom-0 flex w-full flex-col justify-end gap-2 rounded-2xl bg-linear-to-t to-transparent p-4">
              <h3 className="text-primary-foreground text-2xl font-bold">
                Teste
              </h3>
              <p className="text-primary-foreground text-md">Descrição teste</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
