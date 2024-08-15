import { formatWhatsAppId } from '../utils/formatWhatsAppId';

describe('formatWhatsAppId function', () => {

    const phoneNumber = '081234567890';

    it('format whatsapp id', () => {
        expect(formatWhatsAppId(phoneNumber, 'ID')).toBe('6281234567890@s.whatsapp.net');
    });

});
