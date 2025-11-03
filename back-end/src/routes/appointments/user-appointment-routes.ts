import { FastifyInstance } from "fastify";
import { sessionMiddleware } from "../../middleware/session-middleware";
import { UserAppointmentService } from "../../services/user-appointment-service";
import { UserAppointmentController } from "../../controllers/user-appointment-controller";

export const userAppointmentsRoutes = (app: FastifyInstance) => {
  const userAppointmentService = new UserAppointmentService();
  const userAppointmentController = new UserAppointmentController(
    userAppointmentService
  );

  app.get(
    "/user/appointments",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.getUserAppointments(request, reply);
    }
  );

  app.post(
    "/user/appointments/:productId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.createUserAppointment(request, reply);
    }
  );

  app.put(
    "/user/appointments/:appointmentId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.updateUserAppointment(request, reply);
    }
  );

  app.delete(
    "/user/appointments/:appointmentId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.deleteUserAppointment(request, reply);
    }
  );
};
