import { describe, it, expect } from "vitest";
import { encryptedPhone } from "../../utils/encryptedPhone";

describe("encrypted phone", () => {
  it("should encrypt a phone number", () => {
    let phone_number = "123456789";

    expect(encryptedPhone(phone_number)).not.equal(phone_number);
  });

  it("should have a diferent encrypted data each data", () => {
    let phone_number = "123456789";
    let phone_number_2 = "123456789";

    expect(encryptedPhone(phone_number)).not.equal(
      encryptedPhone(phone_number_2)
    );
  });
});
