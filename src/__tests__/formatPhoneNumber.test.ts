import formatPhoneNumber from "../utils/formatPhoneNumber";

describe('formatPhoneNumber function', () => {

    const phoneNumber = '081234567890';

    it('format phone number', () => {
        expect(formatPhoneNumber(phoneNumber, 'ID')).toBe('6281234567890');
    });

});