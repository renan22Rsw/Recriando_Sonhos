import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";
import { AppointmentStatus } from "@prisma/client";
import { productMock } from "../../mocks/product-mocks";
import { userMock } from "../../mocks/user-mock";
import { adminMock } from "../../mocks/admin-mock";
import { sendEmail } from "../../../utils/send-email";

vi.mock("../../../database/index", () => ({
  db: {
    user: {
      findFirst: vi.fn(),
    },

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

describe("Cancel user appointments", () => {
  let userAppointmentService: UserAppointmentService;

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should cancel user appointment", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue(
      userAppointmentMock,
    );

    (db.appointment.update as unknown as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    await userAppointmentService.cancelUserAppointment(
      userAppointmentMock.id,
      userAppointmentMock.userId,
    );

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev", //Just for now
      to: adminMock.email,
      subject: "Agendamento cancelado",
      html: `<p>Um agendamento foi cancelado pelo usuário ${userMock.name}</p>`,
    });
  });

  it("should only update product status if appointment is confirmed", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findUnique as unknown as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CONFIRMED,
    });

    (db.$transaction as Mock).mockResolvedValue([
      userAppointmentMock,
      productMock,
    ]);

    await userAppointmentService.cancelUserAppointment(
      userAppointmentMock.id,
      userAppointmentMock.userId,
    );

    expect(db.$transaction).toHaveBeenCalledWith([
      db.appointment.update({
        where: { id: userAppointmentMock.id },
        data: { status: AppointmentStatus.CANCELED },
      }),

      db.product.update({
        where: { id: userAppointmentMock.productId },
        data: { available: true },
      }),
    ]);

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev", //Just for now
      to: adminMock.email,
      subject: "Agendamento cancelado",
      html: `<p>Um agendamento foi cancelado pelo usuário ${userMock.name}</p>`,
    });
  });

  it("should throw an error if admin does not exist", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(null);
    await expect(
      userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId,
      ),
    ).rejects.toThrowError("Usuário admin não encontrado");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if appointment does not exist", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findUnique as Mock).mockResolvedValue(null);

    await expect(
      userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId,
      ),
    ).rejects.toThrowError("Agendamento não encontrado");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if user tries to cancel an appointment that is canceled", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findUnique as Mock).mockResolvedValue({
      ...userAppointmentMock,
      status: AppointmentStatus.CANCELED,
    });

    await expect(
      userAppointmentService.cancelUserAppointment(
        userAppointmentMock.id,
        userAppointmentMock.userId,
      ),
    ).rejects.toThrowError("Agendamento já foi cancelado");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should throw an error if user tries to cancel an other user's appointment", async () => {
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);

    await expect(
      userAppointmentService.cancelUserAppointment(userAppointmentMock.id, "2"),
    ).rejects.toThrowError("Usuário não autorizado");

    expect(db.appointment.update).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
