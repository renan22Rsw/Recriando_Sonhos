import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileAppointments } from "./profile-appointments";
import { Status } from "./profile-appointments";

export const ProfilePageSection2 = () => {
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
              <ProfileAppointments
                title="Decoracao Festa Infantil - Tema Unicornio"
                status={Status.CONFIRMADO}
                date="20/08/2023"
                price="R$ 500,00"
              />

              <ProfileAppointments
                title="Decoracao Festa Infantil - Tema Unicornio"
                status={Status.PENDENTE}
                date="20/08/2023"
                price="R$ 500,00"
              />

              <ProfileAppointments
                title="Decoracao Festa Infantil - Tema Unicornio"
                status={Status.CONCLUIDO}
                date="20/08/2023"
                price="R$ 500,00"
              />
            </TabsContent>

            <TabsContent value="pendentes">
              <ProfileAppointments
                title="Decoracao Festa Infantil - Tema Unicornio"
                status={Status.PENDENTE}
                date="20/08/2023"
                price="R$ 500,00"
              />
            </TabsContent>

            <TabsContent value="Confirmados">
              <ProfileAppointments
                title="Decoracao Festa Infantil - Tema Unicornio"
                status={Status.CONFIRMADO}
                date="20/08/2023"
                price="R$ 500,00"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
