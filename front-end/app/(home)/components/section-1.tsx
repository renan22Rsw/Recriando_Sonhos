import { Button } from "@/components/ui/button";
import { PartyPopper, ArrowRight } from "lucide-react";
import Image from "next/image";

import UnicornParty from "@/public/unicorn-party.png";
import SunFlowerParty from "@/public/sunflower-party.png";
import BithdayParty from "@/public/birthday-party.png";

export const Section1 = () => {
  return (
    <section className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-8 px-6 py-20 lg:grid-cols-2">
      <div className="container space-y-4 px-6 md:px-4 xl:px-8">
        <span className="flex w-55 items-center gap-2 rounded-3xl bg-[#F6E5E4] px-3 py-2 font-semibold text-[#E85555]">
          <PartyPopper />
          Festas Inesqueciveis
        </span>
        <h1 className="font-serif text-5xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">
          Recriando{" "}
          <span className="relative text-[#E85555]">
            Sonhos
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 10C50 2 150 2 198 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="text-xl font-light sm:text-2xl md:w-120 lg:w-150">
          Transformamos cada celebracao em uma experiencia magica e unica.
          Decorações personalizadas que contam a sua historia.
        </p>
        <div className="space-y-4 space-x-4 py-4 sm:flex">
          <Button className="w-full cursor-pointer rounded-3xl bg-[#E85555] p-6 text-lg font-semibold text-white outline-none hover:bg-[#E85555]/90 sm:w-50">
            Explorar Produtos{" "}
            <span className="pt-0.5">
              <ArrowRight />
            </span>
          </Button>
          <Button
            variant={"outline"}
            className="w-full cursor-pointer rounded-3xl p-6 text-lg font-semibold outline-none sm:w-50"
          >
            Fale Conosco
          </Button>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={UnicornParty}
                alt="Unicorn Party"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={SunFlowerParty}
                alt="Sunflower Party"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={BithdayParty}
                alt="Bithday Party"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};
