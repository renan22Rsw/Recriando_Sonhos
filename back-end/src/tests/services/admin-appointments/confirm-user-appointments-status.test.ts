import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { AdminAppointmentService } from "../../../services/admin-appointment-service";
import { db } from "../../../database/index";
import { sendEmail } from "../../../utils/send-email";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";

import { AppointmentStatus } from "@prisma/client";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("../../../utils/send-email", () => ({
  sendEmail: vi.fn(),
}));

describe("uptade user appointments status to confirmed", () => {
  let adminAppointmentService: AdminAppointmentService;

  beforeEach(() => {
    adminAppointmentService = new AdminAppointmentService();
    vi.clearAllMocks();
  });

  it("should confirm user appointments status and send email to user", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);
    (db.appointment.update as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: "confirmed",
    });

    await adminAppointmentService.confirmUserAppointmentStatus(
      "admin",
      userAppointmentMock.id
    );

    expect(db.appointment.findUnique).toHaveBeenCalled();
    expect(db.appointment.update).toHaveBeenCalledWith({
      where: { id: userAppointmentMock.id },
      data: { status: AppointmentStatus.CONFIRMED },
    });

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev",
      to: userAppointmentMock.email,
      subject: "Agendamento confirmado",
      html: `Ola, ${userAppointmentMock.name}. Seu agendamento foi confirmado!`,
    });
  });

  it("should throw an error if role is not admin", async () => {
    await expect(
      adminAppointmentService.confirmUserAppointmentStatus(
        "user",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Acesso negado");

    expect(db.appointment.findUnique).not.toHaveBeenCalled();
    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if no appointments are found", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(null);

    await expect(
      adminAppointmentService.confirmUserAppointmentStatus(
        "admin",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Agendamento não encontrado");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      adminAppointmentService.confirmUserAppointmentStatus(
        "admin",
        userAppointmentMock.id
      )
    ).rejects.toThrow("Database error");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
