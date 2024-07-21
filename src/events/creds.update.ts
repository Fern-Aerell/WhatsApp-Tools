import { AuthenticationCreds, BaileysEventMap } from "@whiskeysockets/baileys";
import WhatsAppTools from "../core/WhatsAppTools";

export const event: keyof BaileysEventMap = 'creds.update';

export function listener(this: WhatsAppTools, creds: Partial<AuthenticationCreds>) {
    console.log('Credentials updated');
}