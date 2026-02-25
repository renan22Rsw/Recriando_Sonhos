import { cn } from "@/lib/utils";
import { Calendar, CircleCheckBig, Clock } from "lucide-react";
import React from "react";

export const DashboardPageSection1 = () => {
  interface DashBoard {
    id: number;
    value: string;
    status: string;
    icon: React.ElementType;
  }

  const dashboardDatas: DashBoard[] = [
    {
      id: 1,
      value: "24",
      status: "Total de Agendamentos",
      icon: Calendar,
    },

    {
      id: 2,
      value: "1",
      status: "Pendentes",
      icon: Clock,
    },

    {
      id: 3,
      value: "1",
      status: "Confirmados",
      icon: CircleCheckBig,
    },
  ];

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {dashboardDatas.map(({ id, icon: Icon, value, status }) => (
          <div
            className="max-w-88 space-y-4 rounded-2xl bg-white px-4 py-14 shadow-xl"
            key={id}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",

                `${Icon === Calendar ? "bg-blue-200 text-blue-700" : Icon === Clock ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-600"} `,
              )}
            >
              <Icon />
            </div>
            <div>
              <h5 className="text-3xl font-bold">{value}</h5>
              <span className="text-foreground/60">{status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
