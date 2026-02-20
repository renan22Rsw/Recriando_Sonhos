import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

interface ProfileAppointmentsProps {
  title: string;
  status: Status;
  date: string;
  adress: string;
  price: string;
}

export enum Status {
  CONFIRMADO = "Confirmado",
  PENDENTE = "Pendente",
  CONCLUIDO = "Concluido",
}

export const ProfileAppointments = ({
  title,
  status,
  date,
  adress,
  price,
}: ProfileAppointmentsProps) => {
  return (
    <div className="my-8 w-full rounded-2xl border-2 bg-white py-10 shadow-xl">
      <div className="items-center justify-between xl:flex">
        <div className="px-4">
          <h5 className="text-xl font-bold">{title}</h5>
          <p className="text-foreground/60">Aniversario</p>
          <div className="items-center gap-4 py-4 xl:flex">
            <div className="text-foreground/60 flex items-center gap-2">
              <Calendar size={16} />
              <span> {date}</span>
            </div>
            <div className="text-foreground/60 flex items-center gap-2">
              <MapPin size={16} />
              <p>{adress}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4 xl:flex-col">
          <p
            className={cn(
              "w-25 rounded-2xl text-center text-sm font-semibold",

              `${status === "Confirmado" ? "bg-green-200 text-green-700" : `${status === "Pendente" ? "bg-yellow-200 text-yellow-700" : "bg-blue-200 text-blue-700"}`}`,
            )}
          >
            {status}
          </p>
          <span className="text-xl font-bold text-[#E85555]">{price}</span>
        </div>
      </div>
    </div>
  );
};
