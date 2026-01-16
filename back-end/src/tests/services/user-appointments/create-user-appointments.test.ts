import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import { productMock, updateProductMock } from "../../mocks/product-mocks";
import { userMock } from "../../mocks/user-mock";
import {
  createUserAppointmentMock,
  userAppointmentMock,
} from "../../mocks/user-appointment-mocks";

import { sendEmail } from "../../../utils/send-email";
import { encryptedPhone } from "../../../utils/encryptedPhone";

import { AppointmentStatus } from "@prisma/client";

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
    appointment: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },

    $transaction: vi.fn(),
  },
}));

vi.mock("../../../utils/encryptedPhone", () => ({
  encryptedPhone: vi.fn().mockReturnValue("encryptedPhone"),
}));

vi.mock("../../../utils/send-email", () => ({
  sendEmail: vi.fn(),
}));

describe("create user appointment and send email to adm", () => {
  let userAppointmentService: UserAppointmentService;

  beforeEach(() => {
    userAppointmentService = new UserAppointmentService();
    vi.clearAllMocks();
  });

  it("should create an user aappointment", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.user.findUnique as Mock).mockResolvedValue(userMock);
    (db.appointment.findFirst as Mock).mockResolvedValue(null);

    (db.$transaction as Mock).mockResolvedValue([
      createUserAppointmentMock,
      updateProductMock,
    ]);

    const appointment = await userAppointmentService.createUserAppointment(
      {
        ...createUserAppointmentMock,
        userId: userMock.id,
        productId: productMock.id,
        status: AppointmentStatus.PENDING,
      },
      productMock.id
    );

    expect(appointment).toEqual(createUserAppointmentMock);
    expect(db.product.findUnique).toHaveBeenCalled();
    expect(db.user.findUnique).toHaveBeenCalled();
    expect(db.appointment.findFirst).toHaveBeenCalled();
    expect(db.$transaction).toHaveBeenCalled();

    expect(db.appointment.create).toHaveBeenCalledWith({
      data: {
        ...createUserAppointmentMock,
        phone: "encryptedPhone",
        productId: productMock.id,
      },
      include: { product: true, user: true },
    });

    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: productMock.id },
      data: { available: false },
    });

    expect(encryptedPhone).toHaveBeenCalledWith(userAppointmentMock.phone);

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev", //Just for now
      to: userMock.email,
      subject: "Novo agendamento",
      html: `<p>Um novo agendamento foi realizado pelo usuário ${userMock.name}</p>`,
    });
  });

  it("should not create an user appointment if product is not avaliable", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await expect(
      userAppointmentService.createUserAppointment(
        {
          ...createUserAppointmentMock,
          userId: userAppointmentMock.userId,
          productId: productMock.id,
        },
        productMock.id
      )
    ).rejects.toThrow("Produto indisponível");

    expect(db.user.findUnique).not.toHaveBeenCalled();
    expect(db.appointment.findFirst).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should not create an user appointment if user already has an appointment", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.user.findUnique as Mock).mockResolvedValue(userMock);
    (db.appointment.findFirst as Mock).mockResolvedValue(userAppointmentMock);

    await expect(
      userAppointmentService.createUserAppointment(
        {
          ...createUserAppointmentMock,
          userId: userAppointmentMock.userId,
          productId: productMock.id,
        },
        productMock.id
      )
    ).rejects.toThrow("Usuário já agendou esse produto");

    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should not create an user appointment if admin does not exist", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.user.findUnique as Mock).mockResolvedValue(null);

    await expect(
      userAppointmentService.createUserAppointment(
        {
          ...createUserAppointmentMock,
          userId: "",
        },
        productMock.id
      )
    ).rejects.toThrow("Usuário admin não encontrado");

    expect(db.appointment.findFirst).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should not create an user appointment if database fails", async () => {
    (db.product.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      userAppointmentService.createUserAppointment(
        {
          ...createUserAppointmentMock,
          userId: userMock.id,
          productId: productMock.id,
        },
        productMock.id
      )
    ).rejects.toThrow("Database error");

    expect(db.user.findUnique).not.toHaveBeenCalled();
    expect(db.appointment.findFirst).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
