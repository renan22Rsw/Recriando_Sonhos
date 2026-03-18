import { format } from "date-fns";

export const dateFormatted = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy");
};
