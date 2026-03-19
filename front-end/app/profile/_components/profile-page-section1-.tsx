import { Appointments, Status } from "@/types/appointments";
import { Package, CircleCheckBig, CircleAlert, Clock } from "lucide-react";

interface ProfilePageSection1Props {
  appointments: Appointments[];
}

export const ProfilePageSection1 = ({
  appointments,
}: ProfilePageSection1Props) => {
  const appointmentsConfirmed = appointments.filter(
    (appointments) => appointments.status === Status.CONFIRMED,
  );

  const pedingAppointments = appointments.filter(
    (appointments) => appointments.status === Status.PENDING,
  );

  const rejectedAppointments = appointments.filter(
    (appointments) => appointments.status === Status.CANCELED,
  );

  return (
    <section className="py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white py-8 shadow-xl">
          <div className="flex items-center">
            <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
              <Package color="#E85555" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">
                {appointments.length.toString()}
              </h4>
              <span className="text-foreground text-sm">Total de Pedidos</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white py-8 shadow-xl">
          <div className="flex items-center">
            <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
              <CircleCheckBig color="#E85555" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">
                {appointmentsConfirmed.length.toString()}
              </h4>
              <span className="text-foreground text-sm">Confirmados</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white py-8 shadow-xl">
          <div className="flex items-center">
            <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
              <Clock color="#E85555" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">
                {pedingAppointments.length.toString()}
              </h4>
              <span className="text-foreground text-sm">Pendentes</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white py-8 shadow-xl">
          <div className="flex items-center">
            <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
              <CircleAlert color="#E85555" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">
                {rejectedAppointments.length.toString()}
              </h4>
              <span className="text-foreground text-sm">Recusados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
