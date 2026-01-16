import { db } from "../database";
import {
  AppointmentProps,
  UpdateAppointmentProps,
} from "../types/appointment-types";
import { encryptedPhone } from "../utils/encryptedPhone";
import { sendEmail } from "../utils/send-email";
import { AppointmentStatus } from "@prisma/client";
export class UserAppointmentService {
  async getUserAppointments(userId: string) {
    if (!userId) throw new Error("Usuário nao encontrado");

    const appointments = await db.appointment.findMany({
      where: { userId },
      include: {
        product: true,
        user: true,
      },
    });

    return appointments;
  }

  async createUserAppointment(data: AppointmentProps, productId: string) {
    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) throw new Error("Produto indisponível");

    const admin = await db.user.findUnique({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
    });

    if (!admin) throw new Error("Usuário admin não encontrado");

    const existingAppointment = await db.appointment.findFirst({
      where: { userId: data.userId, productId },
    });

    if (existingAppointment) throw new Error("Usuário já agendou esse produto");

    const [appointment] = await db.$transaction([
      db.appointment.create({
        data: {
          ...data,
          phone: encryptedPhone(data.phone),
          status: AppointmentStatus.PENDING,
          productId,
        },
        include: { product: true, user: true },
      }),
      db.product.update({
        where: { id: productId },
        data: { available: false },
      }),
    ]);

    await sendEmail({
      from: "onboarding@resend.dev", //Just for now
      to: admin.email,
      subject: "Novo agendamento",
      html: `<p>Um novo agendamento foi realizado pelo usuário ${data.name}</p>`,
    });

    return appointment;
  }

  async updateUserAppointment(id: string, data: UpdateAppointmentProps) {
    const appointment = await db.appointment.findUnique({ where: { id } });

    if (!appointment) throw new Error("Agendamento não encontrado");

    if (appointment.userId !== data.userId)
      throw new Error("Usuário não autorizado");

    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: {
        ...data,
        phone: data.phone ? encryptedPhone(data.phone) : undefined,
      },
    });

    return updatedAppointment;
  }

  //cancel

  async deleteUserAppointment(id: string, userId: string) {
    const appointment = await db.appointment.findUnique({ where: { id } });

    if (!appointment) throw new Error("Agendamento não encontrado");

    if (userId !== appointment.userId)
      throw new Error("Usuário não autorizado");

    const [deletedAppointment] = await db.$transaction([
      db.appointment.delete({ where: { id: appointment.id } }),
      db.product.update({
        where: { id: appointment.productId },
        data: { available: true },
      }),
    ]);

    return deletedAppointment;
  }
}
