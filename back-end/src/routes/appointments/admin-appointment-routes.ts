import { FastifyInstance } from "fastify";
import { AdminAppointmentServices } from "../../services/admin-appointment-services";
import { AdminAppointmentController } from "../../controllers/admin-appointment-controllers";
import { adminMiddleware } from "../../middleware/admin-middleware";

export const adminAppointmentsRoutes = (app: FastifyInstance) => {
  const adminAppointmentServices = new AdminAppointmentServices();
  const adminAppointmentController = new AdminAppointmentController(
    adminAppointmentServices
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
