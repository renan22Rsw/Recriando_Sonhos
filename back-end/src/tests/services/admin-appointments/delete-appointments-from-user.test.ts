import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { AdminAppointmentService } from "../../../services/admin-appointment-service";
import { db } from "../../../database/index";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";
import { updateProductMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("delete appointment from user", () => {
  let adminAppointmentService: AdminAppointmentService;
  beforeEach(() => {
    adminAppointmentService = new AdminAppointmentService();
    vi.resetAllMocks();
  });

  it("should delete appointment from user", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(userAppointmentMock);
    (db.appointment.delete as Mock).mockResolvedValue(userAppointmentMock);

    const appointment = await adminAppointmentService.deleteAppointmentFromUser(
      "admin",
      userAppointmentMock.id,
    );

    expect(appointment).toEqual(userAppointmentMock);
    expect(db.appointment.delete).toHaveBeenCalled();
  });

  it("should throw an error if role is not admin", async () => {
    await expect(
      adminAppointmentService.deleteAppointmentFromUser(
        "user",
        userAppointmentMock.id,
      ),
    ).rejects.toThrow("Acesso negado");
  });

  it("should throw an error if no appointments are found", async () => {
    (db.appointment.findUnique as Mock).mockResolvedValue(null);

    await expect(
      adminAppointmentService.deleteAppointmentFromUser(
        "admin",
        userAppointmentMock.id,
      ),
    ).rejects.toThrow("Agendamento não encontrado");

    expect(db.appointment.delete).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findUnique as Mock).mockRejectedValue(
      new Error("Database error"),
    );

    await expect(
      adminAppointmentService.deleteAppointmentFromUser(
        "admin",
        userAppointmentMock.id,
      ),
    ).rejects.toThrow("Database error");

    expect(db.appointment.delete).not.toHaveBeenCalled();
  });
});
