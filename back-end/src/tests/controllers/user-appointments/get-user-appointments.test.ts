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

describe("get user appointments", () => {
  let userAppointmentService: UserAppointmentService;
  let userAppointmentController: UserAppointmentController;

  const mockRequest = {
    headers: {
      authorization: "Bearer Token",
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

  it("should get the user appointments", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: { id: "1" },
    });

    userAppointmentService.getUserAppointments = vi
      .fn()
      .mockResolvedValue(userAppointmentMock);

    await userAppointmentController.getUserAppointments(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(userAppointmentMock);
  });

  it("should throw an error if user is not authenticated", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue(null);

    await userAppointmentController.getUserAppointments(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Usuário não autenticado",
    });
  });

  it("should throw an error if status code of 400", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.getUserAppointments = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await userAppointmentController.getUserAppointments(
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

    userAppointmentService.getUserAppointments = vi
      .fn()
      .mockRejectedValueOnce("Error interno do servidor");

    await userAppointmentController.getUserAppointments(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
