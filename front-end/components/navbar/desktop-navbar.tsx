"use client";

import { links } from "./links";
import { Balloon } from "lucide-react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DesktopNavbar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (err: unknown) {
      toast.error("Erro ao deslogar", {
        position: "bottom-right",
        description: "Ocorreu um erro ao deslogar",
      });
    }
  };

  return (
    <nav className="text-foreground flex items-center justify-between bg-white/80 p-6 shadow-sm backdrop-blur-md xl:px-32 2xl:px-44">
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
        <h2 className="text-lg font-bold">Recriando Sonhos</h2>
      </div>

      <div>
        <ul className="flex items-center space-x-8 font-semibold">
          {links.map(({ id, title, href }) => (
            <Link key={id} href={href}>
              <li className="cursor-pointer transition-colors hover:border-b-2 hover:border-[#E64343] hover:text-[#E64343]">
                {title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-4">
        <Link
          href={`${session?.user.role === "admin" ? "/admin/dashboard" : "/profile"}`}
        >
          <Button variant={"ghost"} className="rounded-full hover:bg-amber-200">
            <User size={20} />
          </Button>
        </Link>

        {!session ? (
          <Link href={"/login"}>
            <Button className="cursor-pointer rounded-full bg-[#E85555] px-6 font-semibold hover:bg-[#E85555]/90">
              Entrar
            </Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button
              className="cursor-pointer rounded-full bg-[#E85555] px-6 font-semibold hover:bg-[#E85555]/90"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </Link>
        )}

        {/*auth*/}
      </div>
    </nav>
  );
};
