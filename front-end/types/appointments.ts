import { Products } from "./products";

export interface Appointments {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: Status;
  product: Products;
}

export enum Status {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
}
