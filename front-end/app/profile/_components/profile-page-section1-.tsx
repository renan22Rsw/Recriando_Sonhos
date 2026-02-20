import { Package, CircleCheckBig, CircleAlert, Clock } from "lucide-react";

const status = [
  {
    id: 1,
    value: "3",
    status: "Total de Pedidos",
    icon: <Package color="#E85555" />,
  },

  {
    id: 2,
    value: "1",
    status: "Confirmados",
    icon: <CircleCheckBig color="#E85555" />,
  },

  {
    id: 3,
    value: "1",
    status: "Pendentes",
    icon: <CircleAlert color="#E85555" />,
  },

  {
    id: 4,
    value: "1",
    status: "Concluidos",
    icon: <Clock color="#E85555" />,
  },
];

export const ProfilePageSection1 = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {status.map(({ id, status, value, icon }) => (
          <div className="rounded-2xl bg-white py-8 shadow-xl" key={id}>
            <div className="flex items-center">
              <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
                {icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold">{value}</h4>
                <span className="text-foreground text-sm">{status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
