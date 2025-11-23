import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";
import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findUnique: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },

    product: {
      update: vi.fn(),
    },

    $transaction: vi.fn(),
  },
}));

describe("delete user appointment", () => {
  let userAppointmentService: UserAppointmentService;

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should delete appointment and update product status to available", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);
    (db.$transaction as Mock).mockResolvedValue([
      userAppointmentMock,
      productMock,
    ]);
    const appointment = await userAppointmentService.deleteUserAppointment(
      userAppointmentMock.id,
      userAppointmentMock.userId
    );

    expect(appointment).toEqual(userAppointmentMock);
    expect(db.$transaction).toHaveBeenCalled();

    expect(db.appointment.delete).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
    });

    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.productId },
      data: { available: true },
    });
  });

  it("should not delete user appointment if appointment does not exist", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(null);

    await expect(
      userAppointmentService.deleteUserAppointment(
        "",
        userAppointmentMock.userId
      )
    ).rejects.toThrow("Agendamento não encontrado");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(db.appointment.delete).not.toHaveBeenCalled();
    expect(db.product.update).not.toHaveBeenCalled();
  });

  it("should not delete user appointment if user is not the owner", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);

    await expect(
      userAppointmentService.deleteUserAppointment(userAppointmentMock.id, "")
    ).rejects.toThrow("Usuário não autorizado");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(db.appointment.delete).not.toHaveBeenCalled();
    expect(db.product.update).not.toHaveBeenCalled();
  });

  it("should not delete user appointment if database fails", async () => {
    (db.appointment.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      userAppointmentService.deleteUserAppointment(userAppointmentMock.id, "")
    ).rejects.toThrow("Database error");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(db.appointment.delete).not.toHaveBeenCalled();
    expect(db.product.update).not.toHaveBeenCalled();
  });
});
