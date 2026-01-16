import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { UserAppointmentService } from "../../../services/user-appointment-service";
import { db } from "../../../database/index";
import { productMock } from "../../mocks/product-mocks";
import { userMock } from "../../mocks/user-mock";
import { adminMock } from "../../mocks/admin-mock";
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
      findFirst: vi.fn(),
    },
    appointment: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
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
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
    (db.appointment.findFirst as Mock).mockResolvedValue(null);
    (db.appointment.create as Mock).mockResolvedValue(
      createUserAppointmentMock
    );

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
    expect(db.appointment.findFirst).toHaveBeenCalled();

    expect(db.appointment.create).toHaveBeenCalledWith({
      data: {
        ...createUserAppointmentMock,
        phone: "encryptedPhone",
        productId: productMock.id,
      },
      include: { product: true, user: true },
    });

    expect(encryptedPhone).toHaveBeenCalledWith(userAppointmentMock.phone);

    expect(sendEmail).toHaveBeenCalledWith({
      from: "onboarding@resend.dev", //Just for now
      to: adminMock.email,
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

    expect(db.appointment.findFirst).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should not create an user appointment if user already has an appointment", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.user.findFirst as Mock).mockResolvedValue(adminMock);
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

    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("should not create an user appointment if admin does not exist", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.user.findFirst as Mock).mockResolvedValue(null);

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
    expect(db.appointment.create).not.toHaveBeenCalled();
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

    expect(db.user.findFirst).not.toHaveBeenCalled();
    expect(db.appointment.findFirst).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
