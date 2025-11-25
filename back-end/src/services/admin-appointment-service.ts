import { db } from "../database";
import { sendEmail } from "../utils/send-email";

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

    await db.appointment.update({
      where: { id: appointment.id },
      data: { status: "confirmed" },
    });

    await sendEmail({
      from: "onboarding@resend.dev", // just for now
      to: appointment.email,
      subject: "Agendamento confirmado",
      html: `Ola, ${appointment.name}. Seu agendamento foi confirmado!`,
    });
  }

  async cancelUserAppointmentStatus(role: string, id: string) {
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
        data: { status: "cancelled" },
      }),

      db.product.update({
        where: { id: appointment.productId },
        data: { available: true },
      }),
    ]);

    await sendEmail({
      from: "onboarding@resend.dev", // just for now
      to: appointment.email,
      subject: "Agendamento negado",
      html: `Ola, ${appointment.name}. Seu agendamento foi negado!`,
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

    const [deletedUserAppointment] = await db.$transaction([
      db.appointment.delete({
        where: { id: appointment.id },
      }),
      db.product.update({
        where: { id: appointment.productId },
        data: { available: true },
      }),
    ]);

    return deletedUserAppointment;
  }
}
