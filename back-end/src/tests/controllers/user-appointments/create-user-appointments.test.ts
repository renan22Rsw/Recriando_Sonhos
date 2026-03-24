import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { UserAppointmentController } from "../../../controllers/user-appointment-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../../../lib/auth";
import { createUserAppointmentMock } from "../../mocks/user-appointment-mocks";

vi.mock("../../../services/user-appointment-service");

vi.mock("../../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe("create user appointments", () => {
  let userAppointmentService: UserAppointmentService;
  let userAppointmentController: UserAppointmentController;

  const mockRequest = {
    headers: {
      authorization: "Bearer Token",
    },

    params: {
      productId: "1",
    },

    body: {
      email: "test@gmail.com",
      name: "Test",
      phone: "21999999999",
      date: "2050-01-08", //only works on saturdays and sundays, and it must be higher than the current date
    },
  };

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    userAppointmentController = new UserAppointmentController(
      userAppointmentService,
    );
    vi.clearAllMocks();
  });

  it("should create an user appointment", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.createUserAppointment = vi.fn().mockResolvedValue({
      ...createUserAppointmentMock,
      userId: "1",
      productId: "1",
    });

    await userAppointmentController.createUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith(createUserAppointmentMock);
  });

  it("should throw an error if status code of 400", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.createUserAppointment = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await userAppointmentController.createUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
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

    userAppointmentService.createUserAppointment = vi
      .fn()
      .mockRejectedValue("Error interno do servidor");

    await userAppointmentController.createUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
