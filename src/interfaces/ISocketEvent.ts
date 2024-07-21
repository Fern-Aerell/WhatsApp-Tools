import { BaileysEventMap } from "@whiskeysockets/baileys";

export default interface ISocketEvent {
    event: keyof BaileysEventMap;
    listener: (args: any) => void;
}
