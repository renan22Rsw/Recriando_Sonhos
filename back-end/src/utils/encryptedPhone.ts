import CryptoJS from "crypto-js";

export const encryptedPhone = (phone: string) => {
  //Encrypt function to encrypt users phone number

  const secretKey = process.env.SECRET_KEY as string;
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    phone,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv,
    }
  );

  return iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
};
