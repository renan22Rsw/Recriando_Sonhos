import { FastifyInstance } from "fastify";
import { sessionMiddleware } from "../../middleware/session-middleware";
import { UserAppointmentServices } from "../../services/user-appointment-services";
import { UserAppointmentController } from "../../controllers/user-appointment-controllers";

export const appointmentRoutes = (app: FastifyInstance) => {
  const userAppointmentServices = new UserAppointmentServices();
  const userAppointmentController = new UserAppointmentController(
    userAppointmentServices
  );

  app.get(
    "/user/appointments",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.getUserAppointmentsController(
        request,
        reply
      );
    }
  );

  app.post(
    "/user/appointments/:productId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.createUserAppointmentController(
        request,
        reply
      );
    }
  );

  app.put(
    "/user/appointments/:appointmentId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.updateUserAppointmentController(
        request,
        reply
      );
    }
  );

  app.delete(
    "/user/appointments/:appointmentId",
    { preHandler: sessionMiddleware },
    async (request, reply) => {
      return userAppointmentController.deleteUserAppointmentController(
        request,
        reply
      );
    }
  );
};
