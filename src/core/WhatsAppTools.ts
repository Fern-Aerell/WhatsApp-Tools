import makeWASocket, { AuthenticationState, BaileysEventEmitter, useMultiFileAuthState } from "@whiskeysockets/baileys";
import socketConfigs from "../configs/socket";
import fs from 'fs';
import path from 'path';
import ISocketEvent from "../interfaces/ISocketEvent";
import CommandHandler from "./CommandHandler";

class WhatsAppTools {

    private _commandHandler: CommandHandler;
    private _socket: ReturnType<typeof makeWASocket> | undefined;

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

    async sendSimpleTextToSelf(text: string) {
        if(!this._socket || !this.user) return;
        await this._socket.sendMessage(this.user.id, {text: text});
    }

    async sendInfoToSelf(text: string) {
        this.sendSimpleTextToSelf(`[INFO]\n${text}`);
    }

    async sendPeringatanToSelf(text: string) {
        this.sendSimpleTextToSelf(`[PERINGATAN]\n${text}`);
    }

    async sendErrorToSelf(text: string) {
        this.sendSimpleTextToSelf(`[ERROR]\n${text}`);
    }

    async sendSuksesToSelf(text: string) {
        this.sendSimpleTextToSelf(`[SUKSES]\n${text}`);
    }

    async sendGagalToSelf(text: string) {
        this.sendSimpleTextToSelf(`[GAGAL]\n${text}`);
    }

}

export default WhatsAppTools;