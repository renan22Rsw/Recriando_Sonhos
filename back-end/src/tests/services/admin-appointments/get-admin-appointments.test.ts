import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { AdminAppointmentService } from "../../../services/admin-appointment-service";
import { db } from "../../../database/index";
import { userAppointmentMock } from "../../mocks/user-appointment-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    appointment: {
      findMany: vi.fn(),
    },
  },
}));

describe("get admin appointments", () => {
  let adminAppointmentService: AdminAppointmentService;

  beforeEach(() => {
    adminAppointmentService = new AdminAppointmentService();
    vi.clearAllMocks();
  });

  it("should get all appointments from users", async () => {
    (db.appointment.findMany as Mock).mockResolvedValue(userAppointmentMock);

    const appointments = await adminAppointmentService.getAdminAppointments(
      "admin"
    );

    expect(appointments).toEqual(userAppointmentMock);
    expect(db.appointment.findMany).toHaveBeenCalledWith({
      where: {
        user: {
          role: "user",
        },
      },
    });
  });

  it("should throw an error if user role is not admin", async () => {
    await expect(
      adminAppointmentService.getAdminAppointments("user")
    ).rejects.toThrow("Acesso negado");

    expect(db.appointment.findMany).not.toHaveBeenCalled();
  });

  it("should throw an error if no appointments are found", async () => {
    (db.appointment.findMany as Mock).mockResolvedValue([]);

    await expect(
      adminAppointmentService.getAdminAppointments("admin")
    ).rejects.toThrow("Agendamentos não encontrados");
  });

  it("should throw an error if database fails", async () => {
    (db.appointment.findMany as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      adminAppointmentService.getAdminAppointments("admin")
    ).rejects.toThrow("Database error");
  });
});
