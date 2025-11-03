import { FastifyInstance } from "fastify";
import { AdminAppointmentService } from "../../services/admin-appointment-service";
import { AdminAppointmentController } from "../../controllers/admin-appointment-controller";
import { adminMiddleware } from "../../middleware/admin-middleware";

export const adminAppointmentsRoutes = (app: FastifyInstance) => {
  const adminAppointmentService = new AdminAppointmentService();
  const adminAppointmentController = new AdminAppointmentController(
    adminAppointmentService
  );

  app.get(
    "/admin/appointments",
    { preHandler: adminMiddleware },
    async (request, reply) => {
      return adminAppointmentController.getAdminAppointments(request, reply);
    }
  );

  app.patch(
    "/admin/appointments/:id/confirm",
    { preHandler: adminMiddleware },
    async (request, reply) => {
      return adminAppointmentController.confirmUserAppointmentStatus(
        request,
        reply
      );
    }
  );

  app.patch(
    "/admin/appointments/:id/cancel",
    { preHandler: adminMiddleware },
    async (request, reply) => {
      return adminAppointmentController.cancelUserAppointment(request, reply);
    }
  );

  app.delete(
    "/admin/appointments/:id",
    { preHandler: adminMiddleware },
    async (request, reply) => {
      return adminAppointmentController.deleteAppointmentsFromUser(
        request,
        reply
      );
    }
  );
};
