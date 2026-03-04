"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  EllipsisVertical,
  Check,
  X,
  Trash,
  Clock,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardPageSection2 = ({ status }: { status: string }) => {
  const isMobile = useIsMobile();

  return (
    <section className="rounded-2xl bg-white py-8">
      <div className="px-4">
        <h5 className="text-lg font-bold">Agendamentos</h5>
        <p className="text-foreground/60">
          Gerencie os agendamentos dos seus clientes
        </p>
      </div>

      <div className="p-4">
        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="confirmados">Confirmados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="flex w-full items-center justify-between rounded-2xl bg-[#F6F5F3] px-2 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
                  <span className="text-sm font-bold">MS</span>
                </div>

                <div>
                  <h6 className="font-bold">Maria Santos</h6>
                  <span className="text-foreground/60 text-sm">
                    Decoracao Festa Infantil - Tema Unicornio
                  </span>
                </div>
              </div>

              {!isMobile && (
                <>
                  <div>
                    <h6 className="text-foreground/60 font-bold">Data</h6>
                    <p className="font-bold">14 de Mar</p>
                  </div>

                  <div>
                    <h6 className="text-foreground/60 font-bold">Valor</h6>
                    <p className="font-bold text-[#E64343]">R$ 500,00</p>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-4 px-4">
                {status === "pendente" && (
                  <Badge className="bg-yellow-200 px-4 py-2 font-bold text-yellow-700">
                    <Clock size={12} />
                    Pendente
                  </Badge>
                )}

                {status === "confirmado" && (
                  <Badge className="bg-blue-200 px-4 py-2 font-bold text-blue-700">
                    <CircleCheckBig size={12} />
                    Confirmado
                  </Badge>
                )}

                {status === "cancelado" && (
                  <Badge
                    variant={"destructive"}
                    className="px-4 py-2 font-bold"
                  >
                    <CircleAlert size={12} />
                    Cancelado
                  </Badge>
                )}

                {!isMobile && (
                  <>
                    <Button
                      variant={"outline"}
                      className="rounded-2xl font-semibold"
                    >
                      Recusar
                    </Button>
                    <Button className="rounded-2xl bg-[#E64343] font-bold hover:bg-[#E64343]/90">
                      Confirmar
                    </Button>
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-2 bg-[#F6F5F3]">
                    <DropdownMenuGroup className="space-y-2">
                      <DropdownMenuLabel>Agendamento</DropdownMenuLabel>
                      <DropdownMenuItem className="hover:bg-green cursor-pointer">
                        <Check size={16} /> Confirmar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <X size={16} /> Recusar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Trash size={16} /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
