import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";

export default function formatPhoneNumber(phoneNumber: string, defaultCountry?: CountryCode): string {

    if(!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`;

    // Parse the phone number to detect country and format
    const parsedNumber = parsePhoneNumberFromString(phoneNumber, defaultCountry);

    if(!parsedNumber) {
        throw new Error("Invalid phone number");
    }

    // Return the formatted number in international format
    return parsedNumber.formatInternational().replace(/\s+/g, '');
}