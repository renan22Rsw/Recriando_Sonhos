import { FastifyReply, FastifyRequest } from "fastify";
import { UserAppointmentService } from "../services/user-appointment-service";
import {
  appointmentSchema,
  appointmentUpdateSchema,
} from "../schemas/appointments";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export class UserAppointmentController {
  constructor(private userAppointmentService: UserAppointmentService) {}

  private async getUserId(request: FastifyRequest): Promise<string> {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session || !session.user.id) {
      throw new Error("Usuário não autenticado");
    }

    return session.user.id;
  }

  async getUserAppointments(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = await this.getUserId(request);

      const appointments =
        await this.userAppointmentService.getUserAppointments(userId);

      return reply.status(200).send(appointments);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async createUserAppointment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = await this.getUserId(request);

      const { productId } = request.params as { productId: string };

      const appointmentData = appointmentSchema.parse(request.body);

      const appointment =
        await this.userAppointmentService.createUserAppointment(
          { ...appointmentData, userId, productId },
          productId
        );

      return reply.status(201).send(appointment);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async updateUserAppointment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = await this.getUserId(request);
      const { appointmentId } = request.params as { appointmentId: string };

      const appointmentData = appointmentUpdateSchema.parse(request.body);

      await this.userAppointmentService.updateUserAppointment(appointmentId, {
        ...appointmentData,
        userId,
      });

      return reply
        .status(200)
        .send({ message: "Agendamento atualizado com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async deleteUserAppointment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = await this.getUserId(request);
      const { appointmentId } = request.params as { appointmentId: string };

      await this.userAppointmentService.deleteUserAppointment(
        appointmentId,
        userId
      );

      return reply
        .status(200)
        .send({ message: "Agendamento deletado com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}
