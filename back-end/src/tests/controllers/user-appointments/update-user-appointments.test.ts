import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { UserAppointmentController } from "../../../controllers/user-appointment-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../../../lib/auth";
import { updateProductMock } from "../../mocks/product-mocks";

vi.mock("../../../services/user-appointment-service");

vi.mock("../../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe("update user appointment", () => {
  let userAppointmentService: UserAppointmentService;
  let userAppointmentController: UserAppointmentController;

  const mockRequest = {
    headers: {
      authorization: "Bearer Token",
    },

    params: {
      appointmentId: "1",
    },

    body: {
      email: "test2@gmail.com",
      name: "Test 2",
      phone: "21999999999",
      date: "2050-01-08",
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
  });

  it("should update user appointment datas", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.updateUserAppointment = vi.fn().mockResolvedValue({
      ...updateProductMock,
      userId: "1",
    });

    await userAppointmentController.updateUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Agendamento atualizado com sucesso",
    });
  });

  it("should throw an error if status code of 400", async () => {
    (auth.api.getSession as unknown as Mock).mockResolvedValue({
      user: {
        id: "1",
      },
    });

    userAppointmentService.updateUserAppointment = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await userAppointmentController.updateUserAppointment(
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

    userAppointmentService.updateUserAppointment = vi
      .fn()
      .mockRejectedValue("Error interno do servidor");

    await userAppointmentController.updateUserAppointment(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
