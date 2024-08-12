import makeWASocket, { AuthenticationState, BaileysEventEmitter, useMultiFileAuthState } from "@whiskeysockets/baileys";
import socketConfigs from "../configs/socket";
import fs from 'fs';
import path from 'path';
import ISocketEvent from "../interfaces/ISocketEvent";
import CommandHandler from "./CommandHandler";

class WhatsAppTools {

    private _commandHandler: CommandHandler;
    private _socket: ReturnType<typeof makeWASocket> | undefined;
    private _reconnect: boolean = true;

    constructor() {
        this._commandHandler = new CommandHandler(this);
    }

    public get user() {
        return this._socket?.user;
    }

    public get socket() {
        return this._socket;
    }

    public get command() {
        return this._commandHandler;
    }

    public get reconnect() {
        return this._reconnect;
    }

    public async run() {

        const { state, saveCreds } = await useMultiFileAuthState(socketConfigs.authFolderName);

        this._socket = makeWASocket({
            auth: state,
            printQRInTerminal: socketConfigs.printQRInTerminal,
            browser: socketConfigs.browser,
            logger: socketConfigs.logger
        });

        // Dyanmic Event
        try {
            console.log(`Mengimport file event...`);
            const eventFolderPath = path.join(__dirname, '../events');
            const eventFiles = fs.readdirSync(eventFolderPath);
            for(const file of eventFiles) {
                if(file.endsWith('.ts') || file.endsWith('.js')) {
                    const filePath = path.join(eventFolderPath, file);
                    const event: ISocketEvent = await import(filePath);
                    if(event.event == 'creds.update') {
                        this._socket.ev.on(event.event, (...args) => {
                            saveCreds();
                            event.listener.apply(this, args);
                        });
                    }else{
                        this._socket.ev.on(event.event, event.listener.bind(this));
                    }
                    console.log(`Import file event '${file}'...`);
                }
            }
        }catch(error) {
            console.error(`Error saat mengimport file event:`, error);
        }

    }

    public async stop() {
        if(!this._socket) return;
        await this.sendInfoToSelf('Service mati...');
        this._reconnect = false;
        this._socket.end(undefined);
    }

    public async sendNoWatermarkTextToSelf(text: string) {
        if(!this._socket || !this.user) return;
        await this._socket.sendMessage(this.user.id, {text: text});
    }

    public async sendWatermarkTextToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools]\`\n${text}`);
    }

    public async sendInfoToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools][Info]\`\n${text}`);
    }

    public async sendPeringatanToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools][Peringatan]\`\n${text}`);
    }

    public async sendErrorToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools][Error]\`\n${text}`);
    }

    public async sendSuksesToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools][Sukses]\`\n${text}`);
    }

    public async sendGagalToSelf(text: string) {
        await this.sendNoWatermarkTextToSelf(`\`[WhatsApp Tools][Gagal]\`\n${text}`);
    }

}

export default WhatsAppTools;