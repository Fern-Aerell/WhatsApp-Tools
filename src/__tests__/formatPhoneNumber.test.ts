import formatPhoneNumber from "../utils/formatPhoneNumber";

describe('formatPhoneNumber function', () => {

    const indonesiaPhoneNumberWithCountryCode = '+6281234567890';
    const amerikaPhoneNumberWithCountryCode = '+15551234567';
    const indonesiaPhoneNumber = '081234567890';
    const amerikaPhoneNumber = '5551234567';

    it('format phone number without default country.', () => {
        expect(formatPhoneNumber(indonesiaPhoneNumberWithCountryCode)).toBe('+6281234567890');
        expect(formatPhoneNumber(amerikaPhoneNumberWithCountryCode)).toBe('+15551234567');
    });
    
    it('format phone number without country code with default country', () => {
        expect(formatPhoneNumber(indonesiaPhoneNumber, 'ID')).toBe('+6281234567890');    
        expect(formatPhoneNumber(amerikaPhoneNumber, 'US')).toBe('+15551234567');    
    });

    it('format phone number with country code with default country', () => {
        expect(formatPhoneNumber(indonesiaPhoneNumberWithCountryCode, 'ID')).toBe('+6281234567890');
        expect(formatPhoneNumber(indonesiaPhoneNumberWithCountryCode, 'US')).toBe('+6281234567890');
        expect(formatPhoneNumber(amerikaPhoneNumberWithCountryCode, 'ID')).toBe('+15551234567');
        expect(formatPhoneNumber(amerikaPhoneNumberWithCountryCode, 'US')).toBe('+15551234567');
    });

    it('Error if phone number don\'t have country code.', () => {
        expect(() => formatPhoneNumber(indonesiaPhoneNumber)).toThrow('Invalid phone number');
        expect(() => formatPhoneNumber(amerikaPhoneNumber)).toThrow('Invalid phone number');
    });

});