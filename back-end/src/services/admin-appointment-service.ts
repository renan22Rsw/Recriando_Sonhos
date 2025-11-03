import { db } from "../database";

export class AdminAppointmentService {
  async getAdminAppointments(role: string) {
    try {
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
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao buscar agendamentos");
    }
  }

  async confirmUserAppointmentStatus(role: string, id: string) {
    try {
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
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao confirmar agendamento");
    }
  }

  async cancelUserAppointmentStatus(role: string, id: string) {
    try {
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

      return cancelledUserAppointment;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao cancelar agendamento");
    }
  }

  async deleteAppointmentFromUser(role: string, id: string) {
    try {
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
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao deletar agendamento");
    }
  }
}
