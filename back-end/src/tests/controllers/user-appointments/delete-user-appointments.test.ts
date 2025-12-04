import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { UserAppointmentController } from "../../../controllers/user-appointment-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../../../lib/auth";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";

vi.mock("../../../services/user-appointment-service");

vi.mock("../../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe("delete user appointment", () => {
  let userAppointmentService: UserAppointmentService;
  let userAppointmentController: UserAppointmentController;

  const mockRequest = {
    headers: {
      authorization: "Bearer Token",
    },

    params: {
      appointmentId: "1",
    },
  };

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    userAppointmentController = new UserAppointmentController(
      userAppointmentService
    );
    vi.clearAllMocks();
  });

  it("should delete user appointment", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    await userAppointmentController.deleteUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Agendamento deletado com sucesso",
    });
  });

  it("should throw an error if status code of 400", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.deleteUserAppointment = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await userAppointmentController.deleteUserAppointment(
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
      },
    });

    userAppointmentService.deleteUserAppointment = vi
      .fn()
      .mockRejectedValue("Error interno do servidor");

    await userAppointmentController.deleteUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
