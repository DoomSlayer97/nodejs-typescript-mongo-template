import CryptoJS from "crypto-js"
import CryptoENC from 'crypto-js/enc-utf8';



/* This can be used on client side */
class UtilsEncrypt {

  private readonly _key: any;
  private readonly _iv: string;
  private readonly _opts: any;

  constructor() {

    this._key = CryptoJS.enc.Base64.parse(process.env["PRIVATE_KEY"] as string);
    this._iv = process.env["PRIVATE_IV_KEY"] as string;

    this._opts = {
      iv: CryptoJS.enc.Base64.parse(this._iv),
    }

  }

  encrypt(data: string) {
    return CryptoJS.AES.encrypt(data, process.env["PUBLIC_KEY"] as string);
  }

  decrypt(data: string) {
    const decryptData = CryptoJS.AES.decrypt(data, process.env["PUBLIC_KEY"] as string);

    return decryptData.toString(CryptoENC);
  }

  unCryptDB(elements: any[]) {
    return elements.map((element) => {
      const object: any = {};

      Object.entries(element.toJSON ? element.toJSON() : element).forEach(
        (entry) => {
          const _key = entry[0];
          const value: any = entry[1];
          const decrypted = CryptoJS.AES.decrypt(value, this._key, this._opts);
          const _value = decrypted.toString(CryptoJS.enc.Utf8);
          object[_key] = _value ? _value : value;
        }
      );

      return object;
    });
  }

  encryptFieldValue(value: any) {
    return CryptoJS.AES.encrypt(value, this._key, this._opts)
  }

}

export const utilsEncrypt = new UtilsEncrypt();