import { Award, Heart, Sparkles } from "lucide-react";

export const AboutPageSection2 = () => {
  const values = [
    {
      id: 1,
      title: "Criatividade",
      description:
        "Cada projeto e unico. Criamos decoracoes personalizadas que refletem a personalidade de cada cliente.",
      icon: <Sparkles />,
    },
    {
      id: 2,
      title: "Paixao",
      description:
        "Amamos o que fazemos. Cada detalhe e pensado com carinho para tornar seu momento especial.",
      icon: <Heart />,
    },
    {
      id: 3,
      title: "Qualidade",
      description:
        "Utilizamos materiais de primeira linha para garantir decoracoes impecaveis e duradouras.",
      icon: <Award />,
    },
  ];

  return (
    <section className="bg-[#0B0401] py-24">
      <div className="flex flex-col items-center space-y-4 px-2 py-10 text-white">
        <span className="rounded-2xl bg-[#17100D] px-3 py-2 text-center font-semibold">
          Nossos Valores
        </span>

        <h3 className="text-lg font-semibold md:text-2xl lg:text-3xl">
          O Que Nos Move
        </h3>
        <p className="text-primary-foreground/60 max-w-160 text-center text-xl">
          Nossos valores guiam cada projeto que realizamos, garantindo
          experiencias excepcionais.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-8 px-4 md:grid-cols-3 2xl:w-400">
        {values.map(({ id, title, description, icon }) => (
          <div
            className="rounded-3xl bg-[#17100D] p-8 text-white hover:bg-[#312823] 2xl:w-120"
            key={id}
          >
            <div className="space-y-4">
              <div className="flex w-15 items-center justify-center rounded-2xl bg-[#E64343] py-4">
                {icon}
              </div>
              <h4 className="text-2xl font-semibold">{title}</h4>
              <p className="text-primary-foreground/60 text-lg">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
