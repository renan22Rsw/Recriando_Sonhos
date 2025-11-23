import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import {
  updateUserAppointmentMock,
  userAppointmentMock,
} from "../../mocks/user-appointment-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("../../../utils/encryptedPhone", () => ({
  encryptedPhone: vi.fn().mockReturnValue("encryptedPhone"),
}));

describe("update user appointment", () => {
  let userAppointmentService: UserAppointmentService;
  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should update user appointment", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);
    (db.appointment.update as Mock).mockResolvedValue(
      updateUserAppointmentMock
    );

    await userAppointmentService.updateUserAppointment(userAppointmentMock.id, {
      ...updateUserAppointmentMock,
      userId: userAppointmentMock.userId,
    });

    expect(db.appointment.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
      data: {
        ...updateUserAppointmentMock,
        phone: "encryptedPhone",
      },
    });
  });

  it("should throw an error if appointment does not exist", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(null);
    await expect(
      userAppointmentService.updateUserAppointment(userAppointmentMock.id, {
        ...updateUserAppointmentMock,
        userId: userAppointmentMock.userId,
      })
    ).rejects.toThrowError("Agendamento não encontrado");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });

  it("should throw an error if user is not authorized to update the appointment", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);

    await expect(
      userAppointmentService.updateUserAppointment(userAppointmentMock.id, {
        ...updateUserAppointmentMock,
        userId: "2",
      })
    ).rejects.toThrowError("Usuário não autorizado");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      userAppointmentService.updateUserAppointment(userAppointmentMock.id, {
        ...updateUserAppointmentMock,
        userId: userAppointmentMock.userId,
      })
    ).rejects.toThrowError("Database error");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });
});
