export const Section3 = () => {
  const steps = [
    {
      id: 1,
      step: "01",
      title: "Escolha",
      description: "Navegue pelo catalogo e escolha a decoracao perfeita",
    },

    {
      id: 2,
      step: "02",
      title: "Agende",
      description: "Preencha seus dados e selecione a data do evento",
    },

    {
      id: 3,
      step: "03",
      title: "Celebre",
      description: "Nos cuidamos de tudo para sua festa ser incrivel",
    },
  ];

  return (
    <section className="h-204">
      <div className="pt-32 text-center">
        <span className="text-lg font-semibold text-[#E85555]">
          Como Funciona
        </span>
        <h2 className="py-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Simples e Rapido
        </h2>

        <div className="mx-auto mt-8 block h-40 gap-4 md:flex md:justify-between lg:w-300">
          {steps.map((step) => (
            <div className="flex flex-col items-center gap-4" key={step.id}>
              <div className="flex items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E85555]/20 text-lg font-bold text-[#E85555] hover:bg-[#E85555] hover:text-white">
                  {step.step}
                </div>
              </div>
              <div className="w-full px-4 text-center">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-secondary-foreground/60 py-4 font-semibold lg:w-80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
