"use client";

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

import { Appointments } from "@/types/appointments";

import { Status } from "@/types/appointments";
import { dateFormatted } from "@/utils/date-formatted";
import { DeleteUserAppointmentButton } from "./delete-user-appointment-button";
import { ConfirmUserAppointmentButton } from "./confirm-user-appointment-button";
import { DeclineUserAppointmentButton } from "./decline-user-appointment-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

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

          <TabsContent value="todos" className="space-y-4">
            {appointment.map(({ id, name, product, date, status }) => (
              <Card key={id}>
                <CardContent className="justify-between lg:flex">
                  <div>
                    <div className="flex items-center justify-between">
                      <CardTitle>{name}</CardTitle>

                      {isMobile && (
                        <>
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
                        </>
                      )}
                    </div>
                    <CardDescription>{product.title}</CardDescription>
                  </div>

                  {!isMobile ? (
                    <>
                      <div>
                        <CardTitle>Data</CardTitle>
                        <CardDescription className="font-bold">
                          {dateFormatted(date)}
                        </CardDescription>
                      </div>

                      <div>
                        <CardTitle>Valor</CardTitle>
                        <CardDescription className="font-bold text-[#E64343]">
                          R$ {product.price.toFixed(2)}
                        </CardDescription>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <CardTitle>Data</CardTitle>
                        <CardDescription className="font-bold">
                          {dateFormatted(date)}
                        </CardDescription>
                      </div>
                      <div>
                        <CardTitle>Valor</CardTitle>
                        <CardDescription className="font-bold text-[#E64343]">
                          R$ {product.price.toFixed(2)}
                        </CardDescription>
                      </div>
                    </div>
                  )}

                  {!isMobile && (
                    <>
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
                    </>
                  )}

                  <div className="flex justify-between space-x-4 py-4 md:py-0">
                    <ConfirmUserAppointmentButton id={id} />
                    <DeclineUserAppointmentButton id={id} />
                    <DeleteUserAppointmentButton id={id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pendentes">
            {appointment
              .filter((item) => item.status === Status.PENDING)
              .map(({ id, name, product, date, status }) => (
                <Card key={id}>
                  <CardContent className="justify-between lg:flex">
                    <div>
                      <div className="flex items-center justify-between">
                        <CardTitle>{name}</CardTitle>

                        {isMobile && (
                          <>
                            {status === Status.PENDING && (
                              <Badge className="border-yellow-300 bg-yellow-100 px-4 py-2 font-bold text-yellow-600">
                                <Clock size={12} />
                                Pendente
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                      <CardDescription>{product.title}</CardDescription>
                    </div>

                    {!isMobile ? (
                      <>
                        <div>
                          <CardTitle>Data</CardTitle>
                          <CardDescription className="font-bold">
                            {dateFormatted(date)}
                          </CardDescription>
                        </div>

                        <div>
                          <CardTitle>Valor</CardTitle>
                          <CardDescription className="font-bold text-[#E64343]">
                            R$ {product.price.toFixed(2)}
                          </CardDescription>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between py-4">
                        <div>
                          <CardTitle>Data</CardTitle>
                          <CardDescription>
                            {dateFormatted(date)}
                          </CardDescription>
                        </div>
                        <div>
                          <CardTitle>Valor</CardTitle>
                          <CardDescription>
                            R$ {product.price.toFixed(2)}
                          </CardDescription>
                        </div>
                      </div>
                    )}

                    {!isMobile && (
                      <>
                        {status === Status.PENDING && (
                          <Badge className="border-yellow-300 bg-yellow-100 px-4 py-2 font-bold text-yellow-600">
                            <Clock size={12} />
                            Pendente
                          </Badge>
                        )}
                      </>
                    )}

                    <div className="flex justify-between space-x-4 py-4 md:py-0">
                      <ConfirmUserAppointmentButton id={id} />
                      <DeclineUserAppointmentButton id={id} />
                      <DeleteUserAppointmentButton id={id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="confirmados">
            {appointment
              .filter((item) => item.status === Status.CONFIRMED)
              .map(({ id, name, product, date, status }) => (
                <Card key={id}>
                  <CardContent className="justify-between lg:flex">
                    <div>
                      <div className="flex items-center justify-between">
                        <CardTitle>{name}</CardTitle>

                        {isMobile && (
                          <>
                            {status === Status.CONFIRMED && (
                              <Badge className="border-green-300 bg-green-100 px-4 py-2 font-bold text-green-600">
                                <CircleCheckBig size={12} />
                                Confirmado
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                      <CardDescription>{product.title}</CardDescription>
                    </div>

                    {!isMobile ? (
                      <>
                        <div>
                          <CardTitle>Data</CardTitle>
                          <CardDescription className="font-bold">
                            {dateFormatted(date)}
                          </CardDescription>
                        </div>

                        <div>
                          <CardTitle>Valor</CardTitle>
                          <CardDescription className="font-bold text-[#E64343]">
                            R$ {product.price.toFixed(2)}
                          </CardDescription>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between py-4">
                        <div>
                          <CardTitle>Data</CardTitle>
                          <CardDescription>
                            {dateFormatted(date)}
                          </CardDescription>
                        </div>
                        <div>
                          <CardTitle>Valor</CardTitle>
                          <CardDescription>
                            R$ {product.price.toFixed(2)}
                          </CardDescription>
                        </div>
                      </div>
                    )}

                    {!isMobile && (
                      <>
                        {status === Status.CONFIRMED && (
                          <Badge className="border-green-300 bg-green-100 px-4 py-2 font-bold text-green-600">
                            <CircleCheckBig size={12} />
                            Confirmado
                          </Badge>
                        )}
                      </>
                    )}

                    <div className="flex justify-between space-x-4 py-4 md:py-0">
                      <ConfirmUserAppointmentButton id={id} />
                      <DeclineUserAppointmentButton id={id} />
                      <DeleteUserAppointmentButton id={id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
