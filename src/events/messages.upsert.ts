import { BaileysEventMap, MessageUpsertType, proto } from "@whiskeysockets/baileys";
import WhatsAppTools from "../core/WhatsAppTools";

export const event: keyof BaileysEventMap = 'messages.upsert';

export async function listener(this: WhatsAppTools, data: { messages: proto.IWebMessageInfo[], type: MessageUpsertType }) {

    // Jika tidak ada message
    if (data.messages.length <= 0) return;

    // Simpan message pertama
    const message = data.messages[0];

    // Jika message key remote jid tidak sama dengan user id dan message tidak ada
    if(message.key.remoteJid != this.userJid || !message.message) return;
    
    if(message.message && (message.message.conversation || (message.message.extendedTextMessage && message.message.extendedTextMessage.text))) {
        console.log('\n[WhatsApp Tools][Info]');
        console.log(`Nomor: +${message.key.remoteJid?.split('@')[0]}`);
        console.log(`Name: ${message.pushName}`);
        if(message.message.conversation) {
            console.log(`Message: ${message.message.conversation}`);
        }else if(message.message.extendedTextMessage && message.message.extendedTextMessage.text) {
            console.log(`Message: ${message.message.extendedTextMessage.text}`);
        }
        console.log(`Type: ${data.type}`);
    }

    let args: string[] = [];

    if (
        message.message.conversation
    ) {

        args = message.message.conversation.split(' ');

    } else if (
        message.message.extendedTextMessage &&
        message.message.extendedTextMessage.text
    ) {

        args = message.message.extendedTextMessage.text.split(' ');

    }

    const prefix = this.command.prefix;

    // Jika perintah tidak sama dengan prefix command
    if(args.length <= 0 || !args[0].startsWith(prefix)) return;

    this.command.input(args);
}