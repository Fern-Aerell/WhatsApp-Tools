import { CountryCode } from "libphonenumber-js";
import formatPhoneNumber from "./formatPhoneNumber";
import { S_WHATSAPP_NET } from "@whiskeysockets/baileys";

export default function formatWhatsAppId(phoneNumber: string, defaultCountry: CountryCode) {
    return `${formatPhoneNumber(phoneNumber, defaultCountry)}${S_WHATSAPP_NET}`;
}