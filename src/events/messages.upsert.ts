import { BaileysEventMap, MessageUpsertType, proto } from "@whiskeysockets/baileys";
import WhatsAppTools from "../core/WhatsAppTools";
import formatWhatsAppNumber from "../utils/formatWhatsAppNumber";

export const event: keyof BaileysEventMap = 'messages.upsert';

export async function listener(this: WhatsAppTools, data: { messages: proto.IWebMessageInfo[], type: MessageUpsertType }) {

    // Jika tidak ada message
    if (data.messages.length <= 0) return;

    // Simpan message pertama
    const message = data.messages[0];

    console.log('messages:\n', data.messages);
    console.log('type:\n', data.type);

    // Jika message key remote jid tidak sama dengan user id dan message tidak ada
    if (message.key.remoteJid !== formatWhatsAppNumber(this.user!.id.split(':')[0], true) || !message.message) return;


    let args: string[] = [];

    if (
        message.message.conversation != undefined && 
        message.message.conversation != null
    ) {

        args = message.message.conversation.split(' ');

    } else if (
        message.message.extendedTextMessage != undefined && 
        message.message.extendedTextMessage != null &&
        message.message.extendedTextMessage.text != undefined && 
        message.message.extendedTextMessage.text != null
    ) {

        args = message.message.extendedTextMessage.text.split(' ');

    }

    const prefix = this.command.prefix;

    // Jika perintah tidak sama dengan prefix command
    if(args.length <= 0 || !args[0].startsWith(prefix)) return;

    this.command.input(args);
}