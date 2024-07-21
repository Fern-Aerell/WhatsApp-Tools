export default function formatWhatsAppNumber(phoneNumber: string, jid: boolean = false): string {
    // Hapus semua karakter non-digit
    let cleanNumber = phoneNumber.replace(/\D/g, '');

    // Jika nomor dimulai dengan '08', ubah menjadi '628'
    if (cleanNumber.startsWith('08')) {
        cleanNumber = '62' + cleanNumber.slice(1);
    }

    // Tambahkan '@s.whatsapp.net' di akhir
    return jid ? `${cleanNumber}@s.whatsapp.net` : cleanNumber;
}