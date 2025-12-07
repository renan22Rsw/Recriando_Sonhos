import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { AdminAppointmentService } from "../../../services/admin-appointment-service";
import { AdminAppointmentController } from "../../../controllers/admin-appointment-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../../../lib/auth";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";

vi.mock("../../../services/admin-appointment-service");

vi.mock("../../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe("Confirm user appointment", () => {
  let adminAppointmentService: AdminAppointmentService;
  let adminAppointmentController: AdminAppointmentController;

  const mockRequest = {
    headers: {
      authorization: "Bearer Token",
    },

    params: {
      id: "1",
    },
  };

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  beforeEach(() => {
    adminAppointmentService = new AdminAppointmentService();
    adminAppointmentController = new AdminAppointmentController(
      adminAppointmentService
    );
    vi.clearAllMocks();
  });

  it("should confirm user appointment status", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
        role: "admin",
      },
    });

    adminAppointmentService.confirmUserAppointmentStatus = vi
      .fn()
      .mockResolvedValue(userAppointmentMock);

    await adminAppointmentController.confirmUserAppointmentStatus(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Agendamento confirmado com sucesso",
    });

    expect(mockReply.status).toHaveBeenCalledWith(200);
  });

  it("should throw an error if status code of 400", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
        role: "admin",
      },
    });

    adminAppointmentService.confirmUserAppointmentStatus = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await adminAppointmentController.confirmUserAppointmentStatus(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error",
    });
  });

  it("should throw an error if status code of 500", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
        role: "admin",
      },
    });

    adminAppointmentService.confirmUserAppointmentStatus = vi
      .fn()
      .mockRejectedValue("Error interno do servidor");

    await adminAppointmentController.confirmUserAppointmentStatus(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
