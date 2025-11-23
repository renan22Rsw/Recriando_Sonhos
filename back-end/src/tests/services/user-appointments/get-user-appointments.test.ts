import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";

import { userAppointmentMock } from "../../mocks/user-appointment-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findMany: vi.fn(),
    },
  },
}));

describe("get user appointments", () => {
  let userAppointmentService: UserAppointmentService;

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should get all user appointments", async () => {
    (db.appointment.findMany as Mock).mockResolvedValue(userAppointmentMock);

    const appointments = await userAppointmentService.getUserAppointments(
      userAppointmentMock.userId
    );

    expect(appointments).toEqual(userAppointmentMock);
    expect(db.appointment.findMany).toHaveBeenCalledWith({
      where: {
        userId: userAppointmentMock.userId,
      },

      include: {
        product: true,
        user: true,
      },
    });
  });

  it("should throw an error if userId is not provided", async () => {
    await expect(
      userAppointmentService.getUserAppointments("")
    ).rejects.toThrowError("Usuário nao encontrado");
    expect(db.appointment.findMany).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findMany as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      userAppointmentService.getUserAppointments(userAppointmentMock.userId)
    ).rejects.toThrowError("Database error");
  });
});
