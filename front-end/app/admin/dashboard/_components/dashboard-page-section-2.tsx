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
import { Appointments } from "@/types/appointments";

import { Status } from "@/types/appointments";
import { dateFormatted } from "@/utils/date-formatted";
import { DeleteUserAppointmentButton } from "./delete-user-appointment-button";
import { ConfirmUserAppointmentButton } from "./confirm-user-appointment-button";
import { DeclineUserAppointmentButton } from "./decline-user-appointment-button";

interface DashboardPageSection2Props {
  appointment: Appointments[];
}

export const DashboardPageSection2 = ({
  appointment,
}: DashboardPageSection2Props) => {
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
            {appointment.map(({ id, name, product, date, status }) => (
              <div
                className="flex w-full items-center justify-between rounded-2xl bg-[#F6F5F3] px-2 py-4"
                key={id}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
                    <span className="text-sm font-bold">MS</span>
                  </div>

                  <div>
                    <h6 className="font-bold">{name}</h6>
                    <span className="text-foreground/60 text-sm">
                      {product.title}
                    </span>
                  </div>
                </div>

                {!isMobile && (
                  <>
                    <div>
                      <h6 className="text-foreground/60 font-bold">Data</h6>
                      <p className="font-bold">{dateFormatted(date)}</p>
                    </div>

                    <div>
                      <h6 className="text-foreground/60 font-bold">Valor</h6>
                      <p className="font-bold text-[#E64343]">
                        R$ {product.price},00
                      </p>
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-4 px-4">
                  {status === Status.PENDING && (
                    <Badge className="border-yellow-300 bg-yellow-100 px-4 py-2 font-bold text-yellow-600">
                      <Clock size={12} />
                      Pendente
                    </Badge>
                  )}

                  {status === Status.CONFIRMED && (
                    <Badge className="border-green-300 bg-green-100 px-4 py-2 font-bold text-green-600">
                      <CircleCheckBig size={12} />
                      Confirmado
                    </Badge>
                  )}

                  {status === Status.CANCELED && (
                    <Badge className="border-purple-300 bg-purple-100 px-4 py-2 font-bold text-purple-600">
                      <CircleAlert size={12} />
                      Cancelado
                    </Badge>
                  )}

                  {status === Status.REJECTED && (
                    <Badge className="border-red-300 bg-red-100 text-red-600">
                      <CircleAlert size={12} />
                      Recusado
                    </Badge>
                  )}

                  {!isMobile && (
                    <>
                      <DeclineUserAppointmentButton id={id} />

                      <ConfirmUserAppointmentButton id={id} />
                    </>
                  )}

                  {isMobile ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className="font-semibold">
                          Açõesz
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Check /> Confirmar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <X /> Recusar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash /> Deletar
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DeleteUserAppointmentButton id={id} />
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pendentes">
            {appointment
              .filter((item) => item.status === Status.PENDING)
              .map(({ id, name, product, date }) => (
                <div
                  className="flex w-full items-center justify-between rounded-2xl bg-[#F6F5F3] px-2 py-4"
                  key={id}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
                      <span className="text-sm font-bold">MS</span>
                    </div>

                    <div>
                      <h6 className="font-bold">{name}</h6>
                      <span className="text-foreground/60 text-sm">
                        {product.title}
                      </span>
                    </div>
                  </div>

                  {!isMobile && (
                    <>
                      <div>
                        <h6 className="text-foreground/60 font-bold">Data</h6>
                        <p className="font-bold">{dateFormatted(date)}</p>
                      </div>

                      <div>
                        <h6 className="text-foreground/60 font-bold">Valor</h6>
                        <p className="font-bold text-[#E64343]">
                          R$ {product.price},00
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-4 px-4">
                    <Badge className="border-yellow-300 bg-yellow-100 px-4 py-2 font-bold text-yellow-600">
                      <Clock size={12} />
                      Pendente
                    </Badge>

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

                    {isMobile ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className="font-semibold">
                            Açõesz
                          </DropdownMenuLabel>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Check /> Confirmar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <X /> Recusar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash /> Deletar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <DeleteUserAppointmentButton id={id} />
                    )}
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="confirmados">
            {appointment
              .filter((item) => item.status === Status.CONFIRMED)
              .map(({ id, name, product, date }) => (
                <div
                  className="flex w-full items-center justify-between rounded-2xl bg-[#F6F5F3] px-2 py-4"
                  key={id}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
                      <span className="text-sm font-bold">MS</span>
                    </div>

                    <div>
                      <h6 className="font-bold">{name}</h6>
                      <span className="text-foreground/60 text-sm">
                        {product.title}
                      </span>
                    </div>
                  </div>

                  {!isMobile && (
                    <>
                      <div>
                        <h6 className="text-foreground/60 font-bold">Data</h6>
                        <p className="font-bold">{dateFormatted(date)}</p>
                      </div>

                      <div>
                        <h6 className="text-foreground/60 font-bold">Valor</h6>
                        <p className="font-bold text-[#E64343]">
                          R$ {product.price},00
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-4 px-4">
                    <Badge className="border-green-300 bg-green-100 px-4 py-2 font-bold text-green-600">
                      <CircleCheckBig size={12} />
                      Confirmado
                    </Badge>

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

                    {isMobile ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className="font-semibold">
                            Açõesz
                          </DropdownMenuLabel>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Check /> Confirmar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <X /> Recusar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash /> Deletar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <DeleteUserAppointmentButton id={id} />
                    )}
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
