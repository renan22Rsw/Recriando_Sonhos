import { FastifyReply, FastifyRequest } from "fastify";
import { AdminAppointmentServices } from "../services/admin-appointment-services";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export class AdminAppointmentController {
  constructor(private appointmentService: AdminAppointmentServices) {}

  private async getAdminRole(request: FastifyRequest) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("Acesso negado");
    }

    return session.user.role;
  }

  async getAdminAppointments(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminRole = await this.getAdminRole(request);

      const appointments =
        await this.appointmentService.getAdminAppointmentsService(adminRole);

      return reply.status(200).send(appointments);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async confirmUserAppointmentStatus(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const adminRole = await this.getAdminRole(request);
      const { id } = request.params as { id: string };

      await this.appointmentService.confirmUserAppointmentStatus(adminRole, id);

      return reply
        .status(200)
        .send({ message: "Agendamento confirmado com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async cancelUserAppointment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminRole = await this.getAdminRole(request);
      const { id } = request.params as { id: string };

      await this.appointmentService.cancelUserAppointmentStatus(adminRole, id);

      return reply
        .status(200)
        .send({ message: "Agendamento cancelado com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }

  async deleteAppointmentsFromUser(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const adminRole = await this.getAdminRole(request);
      const { id } = request.params as { id: string };

      await this.appointmentService.deleteAppointmentFromUser(adminRole, id);

      return reply
        .status(200)
        .send({ message: "Agendamento deletados com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message });
      }

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}
