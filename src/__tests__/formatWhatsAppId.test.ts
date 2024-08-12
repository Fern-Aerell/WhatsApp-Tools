import { formatWhatsAppId, whatsAppIdSuffix } from "../utils/formatWhatsAppId";


describe('formatWhatsAppId function', () => {

    const indonesiaPhoneNumberWithCountryCode = '+6281234567890';
    const amerikaPhoneNumberWithCountryCode = '+15551234567';
    const indonesiaPhoneNumber = '081234567890';
    const amerikaPhoneNumber = '5551234567';

    it('format whatsapp id without default country.', () => {
        expect(formatWhatsAppId(indonesiaPhoneNumberWithCountryCode)).toBe(`6281234567890${whatsAppIdSuffix}`);
        expect(formatWhatsAppId(amerikaPhoneNumberWithCountryCode)).toBe(`15551234567${whatsAppIdSuffix}`);
    });

    it('format whatsapp id without country code with default country', () => {
        expect(formatWhatsAppId(indonesiaPhoneNumber, 'ID')).toBe(`6281234567890${whatsAppIdSuffix}`);    
        expect(formatWhatsAppId(amerikaPhoneNumber, 'US')).toBe(`15551234567${whatsAppIdSuffix}`);   
    });

    it('format whatsapp id with country code with default country', () => {
        expect(formatWhatsAppId(indonesiaPhoneNumberWithCountryCode, 'ID')).toBe(`6281234567890${whatsAppIdSuffix}`);
        expect(formatWhatsAppId(indonesiaPhoneNumberWithCountryCode, 'US')).toBe(`6281234567890${whatsAppIdSuffix}`);
        expect(formatWhatsAppId(amerikaPhoneNumberWithCountryCode, 'ID')).toBe(`15551234567${whatsAppIdSuffix}`);
        expect(formatWhatsAppId(amerikaPhoneNumberWithCountryCode, 'US')).toBe(`15551234567${whatsAppIdSuffix}`);
    });

    it('Error if phone number don\'t have country code.', () => {
        expect(() => formatWhatsAppId(indonesiaPhoneNumber)).toThrow('Invalid phone number');
        expect(() => formatWhatsAppId(amerikaPhoneNumber)).toThrow('Invalid phone number');
    });

});