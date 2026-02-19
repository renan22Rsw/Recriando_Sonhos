import Image from "next/image";
import BirthdayParty from "@/public/birthday-party.png";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageCircle, Send } from "lucide-react";

export const ContactPageSection2 = () => {
  return (
    <section className="w-full bg-[#F9F8F7] px-4 py-14">
      <div className="mx-auto grid max-w-400 items-center space-y-4 xl:grid-cols-2">
        <div className="relative aspect-4/3 max-w-150 overflow-hidden rounded-2xl">
          <Image
            src={BirthdayParty}
            alt="birthday-party"
            fill
            className="rounded-2xl object-cover"
            priority
          />

          <div className="from-foreground/80 absolute bottom-0 flex w-full flex-col justify-end gap-2 rounded-2xl bg-linear-to-t to-transparent p-4">
            <h3 className="text-primary-foreground text-2xl font-bold">
              Transforme seu evento em um sonho
            </h3>
            <p className="text-primary-foreground/60 text-md">
              Nossa equipe esta pronta para criar algo especial para vocee
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="max-w-200 space-y-4 rounded-2xl bg-white p-4 shadow-2xl">
            <h3 className="font-bold">Siga-nos nas Redes Sociais</h3>
            <p className="text-foreground/60">
              Acompanhe nossos trabalhos e novidades
            </p>
            <div className="space-x-4">
              <Button className="cursor-pointer rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 font-semibold text-white transition-opacity hover:opacity-90 lg:w-50">
                <Instagram size={16} /> Instagram
              </Button>
              <Button className="cursor-pointer rounded-2xl bg-blue-600 font-semibold text-white transition-opacity hover:bg-blue-500 hover:opacity-90 lg:w-50">
                <Facebook size={16} /> Facebook
              </Button>
            </div>
          </div>

          <div className="max-w-200 space-y-4 rounded-2xl bg-[#F0FDF4] p-4 shadow-2xl">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500">
                <div className="flex h-full items-center justify-center">
                  <MessageCircle size={24} color="#fff" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-green-800">WhatsApp</h3>
                <p className="text-green-600">
                  Prefere conversar diretamente? Chame no WhatsApp!
                </p>
              </div>
            </div>
            <div className="b w-full px-10">
              <Button
                variant={"ghost"}
                className="cursor-pointer rounded-2xl text-lg font-semibold text-green-600 hover:bg-transparent hover:text-green-800 lg:w-50"
              >
                Iniciar Conversa
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
