import { contact } from "./contact-info";

export const ContactPageSection1 = () => {
  return (
    <section className="bg-[#F4F3F1] py-14">
      <div className="mx-auto grid max-w-420 grid-cols-2 gap-4 px-4 lg:grid-cols-4">
        {contact.map(({ id, icon, label, contact, message }) => (
          <div
            className="flex flex-col items-center space-y-2 rounded-2xl bg-white px-4 py-6 shadow-2xl duration-500 ease-in-out hover:scale-105 2xl:w-100"
            key={id}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6E5E4]">
              {icon}
            </div>
            <h4 className="font-bold sm:text-lg">{label}</h4>
            <span className="sm:text-md text-center text-sm font-semibold text-[#E85555]">
              {contact}
            </span>
            <span className="text-sm font-light">{message}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
