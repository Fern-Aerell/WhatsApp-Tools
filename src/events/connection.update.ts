import { BaileysEventMap, ConnectionState, DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from '@hapi/boom';
import WhatsAppTools from "../core/WhatsAppTools";

export const event: keyof BaileysEventMap = 'connection.update';

export function listener(this: WhatsAppTools, update: Partial<ConnectionState>) {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const shouldReconnect = this.reconnect && (lastDisconnect!.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('Koneksi terputus karena ', lastDisconnect!.error, ', mencoba menghubungkan kembali ', shouldReconnect);
        // reconnect if not logged out
        if (shouldReconnect) {
            this.run();
        }
    } else if (connection === 'open') {
        console.log('Koneksi berhasil dibuka');
        this.sendInfoToSelf('Service sudah aktif...');
    }
}