export interface AppointmentProps {
  email: string;
  name: string;
  phone: string;
  date: Date;
  status: string;
  productId: string;
  userId: string;
}

export interface UpdateAppointmentProps {
  email?: string;
  name?: string;
  phone?: string;
  date?: Date;
  userId: string;
}
