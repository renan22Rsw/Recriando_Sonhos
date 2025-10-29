import { db } from "../database";
import {
  AppointmentProps,
  UpdateAppointmentProps,
} from "../types/appointment-types";
import { encryptedPhone } from "../utils/encryptedPhone";

export class UserAppointmentServices {
  async getUserAppointmentsService(userId: string) {
    try {
      const appointments = await db.appointment.findMany({
        where: { userId },
        include: {
          product: true,
          user: true,
        },
      });

      return appointments;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao buscar agendamentos");
    }
  }

  async createUserAppointmentService(
    data: AppointmentProps,
    productId: string
  ) {
    try {
      const product = await db.product.findUnique({ where: { id: productId } });

      if (!product) throw new Error("Produto não encontrado");
      if (!product.available)
        throw new Error("Produto não disponível no momento");

      const existingAppointment = await db.appointment.findFirst({
        where: { userId: data.userId, productId },
      });

      if (existingAppointment)
        throw new Error("Usuário já agendou esse produto");

      const [appointment] = await db.$transaction([
        db.appointment.create({
          data: {
            ...data,
            phone: encryptedPhone(data.phone),
            productId,
          },
          include: { product: true, user: true },
        }),
        db.product.update({
          where: { id: productId },
          data: { available: false },
        }),
      ]);

      return appointment;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao criar agendamento");
    }
  }

  async updateUserAppointmentService(id: string, data: UpdateAppointmentProps) {
    try {
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
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao atualizar agendamento");
    }
  }

  async deleteUserAppointmentService(id: string, userId: string) {
    try {
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
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Erro ao deletar agendamento");
    }
  }
}
