import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileAppointments } from "./profile-appointments";
import { Appointments, Status } from "@/types/appointments";

interface ProfilePageSection2Props {
  appointments: Appointments[];
}

export const ProfilePageSection2 = ({
  appointments,
}: ProfilePageSection2Props) => {
  return (
    <section className="rounded-2xl bg-white py-8 shadow-xl">
      <div className="px-4">
        <h4 className="text-lg font-semibold">Meus Agendamentos</h4>
        <span className="text-foreground/60">
          Acompanhe o status de todos os seus pedidos
        </span>

        <div className="py-4">
          <Tabs defaultValue="todos">
            <TabsList>
              <TabsTrigger value="todos" className="xl:w-300">
                Todos
              </TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="confirmados">Confirmados</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              {appointments.map((appointment) => (
                <div key={appointment.id}>
                  <ProfileAppointments
                    id={appointment.id}
                    title={appointment.product?.title}
                    status={appointment.status}
                    date={appointment.date}
                    price={`R$ ${appointment.product?.price}` + ",00"}
                    name={appointment.name}
                    email={appointment.email}
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="pendentes">
              {appointments
                .filter((appointment) => appointment.status === Status.PENDING)
                .map((appointment) => (
                  <div key={appointment.id}>
                    <ProfileAppointments
                      id={appointment.id}
                      title={appointment.product?.title}
                      status={appointment.status}
                      date={appointment.date}
                      price={`R$ ${appointment.product?.price}` + ",00"}
                      name={appointment.name}
                      email={appointment.email}
                    />
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="confirmados">
              {appointments
                .filter(
                  (appointment) => appointment.status === Status.CONFIRMED,
                )
                .map((appointment) => (
                  <div key={appointment.id}>
                    <ProfileAppointments
                      id={appointment.id}
                      title={appointment.product?.title}
                      status={appointment.status}
                      date={appointment.date}
                      price={`R$ ${appointment.product?.price}` + ",00"}
                      name={appointment.name}
                      email={appointment.email}
                    />
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
