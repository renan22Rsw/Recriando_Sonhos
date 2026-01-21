import { db } from "../database";
import { sendEmail } from "../utils/send-email";
import { AppointmentStatus } from "@prisma/client";

export class AdminAppointmentService {
  async getAdminAppointments(role: string) {
    if (role !== "admin") throw new Error("Acesso negado");

    const appointments = await db.appointment.findMany({
      where: {
        user: {
          role: "user",
        },
      },
    });

    if (!appointments || appointments.length === 0)
      throw new Error("Agendamentos não encontrados");

    return appointments;
  }

  async confirmUserAppointmentStatus(role: string, id: string) {
    if (role !== "admin") throw new Error("Acesso negado");

    const appointment = await db.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error("Agendamento não encontrado");

    const [confirmUserAppointment] = await db.$transaction([
      db.appointment.update({
        where: { id: appointment.id },
        data: {
          status: AppointmentStatus.CONFIRMED,
        },
      }),

      db.product.update({
        where: { id: appointment.productId },
        data: { available: false },
      }),
    ]);

    await sendEmail({
      from: "onboarding@resend.dev", // just for now
      to: appointment.email,
      subject: "Agendamento confirmado",
      html: `Ola, ${appointment.name}. Seu agendamento foi confirmado!`,
    });

    return confirmUserAppointment;
  }

  async rejectUserAppointmentStatus(role: string, id: string) {
    if (role !== "admin") throw new Error("Acesso negado");

    const appointment = await db.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error("Agendamento não encontrado");

    const [cancelledUserAppointment] = await db.$transaction([
      db.appointment.update({
        where: { id: appointment.id },
        data: { status: AppointmentStatus.REJECTED },
      }),

      db.product.update({
        where: { id: appointment.productId },
        data: { available: true },
      }),
    ]);

    await sendEmail({
      from: "onboarding@resend.dev", // just for now
      to: appointment.email,
      subject: "Agendamento rejeitado",
      html: `Ola, ${appointment.name}. Seu agendamento foi rejeitado!`,
    });

    return cancelledUserAppointment;
  }

  async deleteAppointmentFromUser(role: string, id: string) {
    if (role !== "admin") throw new Error("Acesso negado");

    const appointment = await db.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) throw new Error("Agendamento não encontrado");

    const deletedAppointment = await db.appointment.delete({
      where: { id: appointment.id },
    });

    return deletedAppointment;
  }
}
