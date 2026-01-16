import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { AdminAppointmentService } from "../../../services/admin-appointment-service";
import { db } from "../../../database/index";
import { sendEmail } from "../../../utils/send-email";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";
import { updateProductMock } from "../../mocks/product-mocks";

import { AppointmentStatus } from "@prisma/client";

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

vi.mock("../../../utils/send-email", () => ({
  sendEmail: vi.fn(),
}));

describe("update user appointments status to canceled", () => {
  let adminAppointmentService: AdminAppointmentService;

  beforeEach(() => {
    adminAppointmentService = new AdminAppointmentService();
    vi.clearAllMocks();
  });

  it("should update user appointments to canceled, update product available to true and send email", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);
    (db.$transaction as Mock).mockResolvedValue([
      userAppointmentMock,
      updateProductMock,
    ]);

    const appointment =
      await adminAppointmentService.rejectUserAppointmentStatus(
        "admin",
        userAppointmentMock.id
      );

    expect(appointment).toEqual(userAppointmentMock);
    expect(db.$transaction).toHaveBeenCalled();

    expect(db.appointment.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
      data: { status: AppointmentStatus.REJECTED },
    });

    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.productId },
      data: { available: true },
    });

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev", // just for now
      to: userAppointmentMock.email,
      subject: "Agendamento rejeitado",
      html: `Ola, ${userAppointmentMock.name}. Seu agendamento foi rejeitado!`,
    });
  });

  it("should throw an error if role is not admin", async () => {
    await expect(
      adminAppointmentService.rejectUserAppointmentStatus(
        "user",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Acesso negado");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if no appointments are found", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(null);

    await expect(
      adminAppointmentService.rejectUserAppointmentStatus(
        "admin",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Agendamento não encontrado");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      adminAppointmentService.rejectUserAppointmentStatus(
        "admin",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Database error");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
