"use client";

import Link from "next/link";
import { links } from "./links";
import { Balloon, Menu, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
export const MobileNavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (err: unknown) {
      toast.error("Erro ao deslogar", {
        position: "top-center",
        description: "Ocorreu um erro ao deslogar",
      });
    }
  };

  return (
    <nav className="relative">
      <div className="text-foreground flex items-center justify-between p-6 shadow-sm">
        <div className="flex items-center gap-x-2">
          <Link
            href={"/"}
            className="w-10 rounded-full bg-[#E64343] py-2 duration-300 ease-in-out hover:scale-105"
          >
            <Balloon size={24} color="#fff" className="mx-auto" />
          </Link>

          <h2 className="text-lg font-bold">Recriando Sonhos</h2>
        </div>

        <Button
          variant="ghost"
          className="rounded-full hover:bg-amber-200"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={`bg-background overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-125 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        } `}
      >
        <div className="p-6">
          <ul>
            {links.map(({ id, title, href }) => (
              <Link key={id} href={href}>
                <li className="py-2 text-lg font-bold">{title}</li>
              </Link>
            ))}
          </ul>

          <Link
            href={
              session?.user.role === "admin" ? "/admin/dashboard" : "/profile"
            }
            className="py-4"
          >
            <Button variant="outline" className="w-full text-lg shadow-lg">
              <User size={14} />
              Meu Perfil
            </Button>
          </Link>

          {!session ? (
            <Button className="text-primary-foreground w-full bg-[#E85555] text-lg font-bold">
              Entrar
            </Button>
          ) : (
            <Button
              className="text-primary-foreground w-full bg-[#E85555] text-lg font-bold"
              onClick={handleLogout}
            >
              Sair
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
