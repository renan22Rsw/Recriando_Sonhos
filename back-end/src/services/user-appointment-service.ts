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

    const admin = await db.user.findFirst({
      where: {
        role: "admin",
      },
    });

    if (!admin) throw new Error("Usuário admin não encontrado");

    const existingAppointment = await db.appointment.findFirst({
      where: { userId: data.userId, productId },
    });

    if (existingAppointment) throw new Error("Usuário já agendou esse produto");

    const appointment = await db.appointment.create({
      data: {
        ...data,
        phone: encryptedPhone(data.phone),
        status: AppointmentStatus.PENDING,
        productId,
      },
      include: { product: true, user: true },
    });

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

    if (appointment.status === AppointmentStatus.CANCELED) {
      throw new Error("Agendamento já foi cancelado");
    }
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

  async cancelUserAppointment(id: string, userId: string) {
    const admin = await db.user.findFirst({
      where: {
        role: "admin",
      },
    });

    if (!admin) throw new Error("Usuário admin não encontrado");

    const appointment = await db.appointment.findUnique({ where: { id } });

    if (!appointment) throw new Error("Agendamento não encontrado");

    if (appointment.status === AppointmentStatus.CANCELED)
      throw new Error("Agendamento já foi cancelado");

    if (appointment.userId !== userId)
      throw new Error("Usuário não autorizado");

    // Se estava confirmado, libera o produto
    if (appointment.status === AppointmentStatus.CONFIRMED) {
      await db.$transaction([
        db.appointment.update({
          where: { id },
          data: { status: AppointmentStatus.CANCELED },
        }),
        db.product.update({
          where: { id: appointment.productId },
          data: { available: true },
        }),
      ]);
    } else {
      await db.appointment.update({
        where: { id },
        data: { status: AppointmentStatus.CANCELED },
      });
    }

    await sendEmail({
      from: "onboarding@resend.dev", //Just for now
      to: admin.email,
      subject: "Agendamento cancelado",
      html: `<p>Um agendamento foi cancelado pelo usuário ${appointment.name}</p>`,
    });
  }

  async deleteUserAppointment(id: string, userId: string) {
    const appointment = await db.appointment.findUnique({ where: { id } });

    if (!appointment) throw new Error("Agendamento não encontrado");

    if (userId !== appointment.userId)
      throw new Error("Usuário não autorizado");

    const deletedAppointment = await db.appointment.delete({ where: { id } });

    return deletedAppointment;
  }
}
