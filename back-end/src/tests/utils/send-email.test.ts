import { vi, describe, it, expect, Mock } from "vitest";
import nodemailer from "nodemailer";
import { sendEmail } from "../../utils/send-email";

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: "123" }),
    }),
  },
}));

describe("send email", () => {
  it("should call nodemailer sendMail", async () => {
    const transport = nodemailer.createTransport();
    const sendMailMock = transport.sendMail as Mock;

    await sendEmail({
      from: "test",
      to: "test",
      subject: "test",
      html: "test",
    });

    expect(sendMailMock).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: "test",
      to: "test",
      subject: "test",
      html: "test",
    });
  });

  it("should throw an error if nodemailer sendMail fails", async () => {
    const transport = nodemailer.createTransport();

    (transport.sendMail as Mock).mockRejectedValue(new Error("Test error"));

    await expect(
      sendEmail({
        from: "test",
        to: "test",
        subject: "test",
        html: "test",
      })
    ).rejects.toThrow("Test error");
  });
});
