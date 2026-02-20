import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const ProfilePageHeader = () => {
  return (
    <header className="relative max-w-400 rounded-2xl bg-white py-8 shadow-xl">
      <div className="bg-[#E64444] py-15">
        <div className="absolute top-28 left-5 flex h-25 w-25 items-center justify-center rounded-full border-2 bg-yellow-400 font-bold text-white sm:left-10">
          RS
        </div>
      </div>
      <div className="items-center justify-between sm:flex">
        <div className="px-6 py-20 sm:px-40 sm:py-2">
          <h3 className="text-2xl font-bold">Rafael Silva</h3>
          <span className="text-foreground/60 text-lg">
            rafaelsilva@test.com
          </span>
        </div>

        <div className="px-4">
          <Button variant={"ghost"} className="w-full border-2 shadow-2xl">
            <Settings />
            Configurações
          </Button>
        </div>
      </div>
    </header>
  );
};
