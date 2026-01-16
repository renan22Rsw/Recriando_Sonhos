import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";
import { AppointmentStatus } from "@prisma/client";
import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },

    product: {
      update: vi.fn(),
    },

    $transaction: vi.fn(),
  },
}));

describe("Cancel user appointments", () => {
  let userAppointmentService: UserAppointmentService;

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should cancel user appointment", async () => {
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue(
      userAppointmentMock
    );

    (db.appointment.update as unknown as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    const canceledAppointment =
      await userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId
      );

    expect(canceledAppointment).toEqual({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    expect(db.appointment.findUnique).toHaveBeenCalled();
    expect(db.appointment.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
      data: { status: AppointmentStatus.CANCELED },
    });
  });

  it("should update user appointment status to canceled and only update product available if status is confirmed", async () => {
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CONFIRMED,
    });

    (db.$transaction as unknown as Mock).mockResolvedValue([
      {
        ...userAppointmentMock,
        status: AppointmentStatus.CANCELED,
      },

      {
        ...productMock,
        available: true,
      },
    ]);

    const canceledAppointment =
      await userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId
      );

    expect(canceledAppointment).toEqual({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    expect(db.appointment.findUnique).toHaveBeenCalled();
    expect(db.$transaction).toHaveBeenCalled();

    expect(db.appointment.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
      data: { status: AppointmentStatus.CANCELED },
    });
    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.productId },
      data: { available: true },
    });
  });

  it("should not update user appointment status to canceled if status is already canceled", async () => {
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    await expect(
      userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId
      )
    ).rejects.toThrow("Agendamento já foi cancelado");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });

  it("should not update user appointment status to canceled if appointment does not exist", async () => {
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue(null);

    await expect(
      userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId
      )
    ).rejects.toThrow("Agendamento não encontrado");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });

  it("should not update user appointment status to canceled if user is not authorized", async () => {
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue(
      userAppointmentMock
    );

    await expect(
      userAppointmentService.cancelUserAppointment(userAppointmentMock.id, "2")
    ).rejects.toThrow("Usuário não autorizado");

    expect(db.appointment.update).not.toHaveBeenCalled();
  });
});
