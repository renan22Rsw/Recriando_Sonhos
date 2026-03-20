import { Appointments, Status } from "@/types/appointments";
import { Calendar, CircleCheckBig, Clock } from "lucide-react";

interface AppointmentsProps {
  appointment: Appointments[];
}

export const DashboardPageSection1 = ({ appointment }: AppointmentsProps) => {
  const totalAppointments = appointment.length;

  const pendingAppointments = appointment.filter(
    (item) => item.status === Status.PENDING,
  ).length;

  const confirmedAppointments = appointment.filter(
    (item) => item.status === Status.CONFIRMED,
  ).length;

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="max-w-full space-y-4 rounded-2xl bg-white px-4 py-14 shadow-xl">
          <div
            className={
              "flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
            }
          >
            <Calendar />
          </div>
          <div>
            <h5 className="text-3xl font-bold">
              {totalAppointments.toString()}
            </h5>
            <span className="text-foreground/60">Total Agendamentos</span>
          </div>
        </div>

        <div className="max-w-full space-y-4 rounded-2xl bg-white px-4 py-14 shadow-xl">
          <div
            className={
              "flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700"
            }
          >
            <Clock />
          </div>
          <div>
            <h5 className="text-3xl font-bold">
              {pendingAppointments.toString()}
            </h5>
            <span className="text-foreground/60">Pendentes</span>
          </div>
        </div>

        <div className="max-w-full space-y-4 rounded-2xl bg-white px-4 py-14 shadow-xl">
          <div
            className={
              "flex h-12 w-12 items-center justify-center rounded-full bg-green-200 text-green-600"
            }
          >
            <CircleCheckBig />
          </div>
          <div>
            <h5 className="text-3xl font-bold">
              {confirmedAppointments.toString()}
            </h5>
            <span className="text-foreground/60">Confirmados</span>
          </div>
        </div>
      </div>
    </section>
  );
};
