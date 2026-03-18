import { Status } from "@/types/appointments";

export const statusFormatted = (status: Status) => {
  switch (status) {
    case Status.CONFIRMED:
      return "Confirmado";
    case Status.CANCELED:
      return "Cancelado";
    case Status.PENDING:
      return "Pendente";
    default:
      return "Pendente";
  }
};
