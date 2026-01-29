import { Balloon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { links, services } from "./links";

import { Instagram, Facebook } from "lucide-react";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#0B0401]">
      <header className="border-b-primary-foreground/60 w-full items-center justify-between space-y-4 border-b px-6 py-8 xl:flex xl:px-32 2xl:px-44">
        <div>
          <h4 className="text-xl font-semibold text-white">Fique por dentro</h4>
          <p className="text-primary-foreground/60 text-lg">
            Receba novidades e ofertas exclusivas
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            className="w-70 rounded-2xl border-transparent bg-[#221C19] text-white selection:bg-[#E64343] selection:text-white placeholder:font-semibold focus-visible:ring-[#E64343] focus-visible:ring-offset-0"
            placeholder="Seu email"
          />

          <Button
            className="rounded-2xl bg-[#E64343] font-bold text-white"
            variant={"ghost"}
          >
            Inscrever
          </Button>
        </div>
      </header>

      <div className="grid gap-4 px-4 py-15 md:grid-cols-2 xl:grid-cols-4 xl:px-32 2xl:px-44">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <Link
              href={"/"}
              className="w-10 rounded-full bg-[#E64343] py-2 duration-300 ease-in-out hover:scale-105"
            >
              <Balloon
                size={24}
                color="#fff"
                fontWeight={"bold"}
                className="mx-auto"
              />
            </Link>
            <h5 className="text-xl font-bold text-white">Recriando Sonhos</h5>
          </div>
          <p className="text-primary-foreground/60 max-w-70 text-lg">
            Transformamos seus eventos em momentos inesqueciveis com decoracoes
            personalizadas e cheias de amor.
          </p>

          <div className="flex items-center gap-x-4">
            <Instagram className="h-10 w-10 rounded-full bg-[#221C19] py-2 text-white hover:bg-[#E64343]" />
            <Facebook className="h-10 w-10 rounded-full bg-[#221C19] py-2 text-white hover:bg-[#E64343]" />
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-xl font-bold text-white">Links Rapidos</h5>
          <ul className="text-primary-foreground/60">
            {links.map(({ id, title, href }) => (
              <li key={id} className="py-2 text-lg">
                <Link href={href} className="hover:text-[#E64343]">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="text-xl font-bold text-white">Serviços</h5>
          <ul className="text-primary-foreground/60">
            {services.map(({ id, title, href }) => (
              <li key={id} className="py-2 text-lg">
                <Link href={href} className="hover:text-[#E64343]">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="text-xl font-bold text-white">Contato</h5>
          <ul className="text-primary-foreground/60 space-y-4 py-1 text-lg">
            <li>(00) 99999-9999</li>
            <li>contato@recriandosonhos.com</li>
            <li>Rio de Janeiro</li>
          </ul>
        </div>
      </div>

      <div className="border-primary-foreground/60 mx-auto w-[81.5%] border-t xl:px-32 2xl:px-44"></div>

      <div className="text-primary-foreground/60 flex flex-col items-center justify-between space-y-4 px-4 py-8 lg:px-32 2xl:px-44">
        <span>© 2026 Recriando Sonhos. Todos os direitos reservados.</span>
        <br />
        <span>Feito com ❤️ em Rio de Janeiro</span>
      </div>
    </footer>
  );
};
