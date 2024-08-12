import { CountryCode } from "libphonenumber-js";
import formatPhoneNumber from "./formatPhoneNumber";

export const whatsAppIdSuffix = '@s.whatsapp.net';

export function formatWhatsAppId(phoneNumber: string, defaultCountry?: CountryCode) {
    return `${formatPhoneNumber(phoneNumber, defaultCountry).replace('+', '')}${whatsAppIdSuffix}`;
}