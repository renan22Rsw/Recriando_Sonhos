import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { JSX } from "react";

interface Contact {
  id: number;
  icon: JSX.Element;
  label: string;
  contact: string;
  message: string;
}

export const contact: Contact[] = [
  {
    id: 1,
    icon: <Phone size={20} color="#E85555" />,
    label: "Telefone",
    contact: "(21) 99999-9999",
    message: "Ligue para nos",
  },

  {
    id: 2,
    icon: <Mail size={20} color="#E85555" />,
    label: "Email",
    contact: "example@example.com",
    message: "Envie um email para nos",
  },

  {
    id: 3,
    icon: <MapPin size={20} color="#E85555" />,
    label: "Endereço",
    contact: "Rio de Janeiro, Brasil",
    message: "Zona Oeste, 1234",
  },

  {
    id: 4,
    icon: <Clock size={20} color="#E85555" />,
    label: "Horario",
    contact: "Sab-Dom: 8:00 - 18:00",
    message: "Atendimento",
  },
];
