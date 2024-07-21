import WhatsAppTools from "./WhatsAppTools";
import fs from 'fs';
import path from 'path';
import ICommand from "../interfaces/ICommand";
import ICommandData from "../interfaces/ICommandData";
import commandConfig from "../configs/command";

export default class CommandHandler {

    private _prefix: string = commandConfig.prefix;
    private _wat: WhatsAppTools;
    private _commands: Array<ICommandData> = [];

    constructor(wat: WhatsAppTools) {

        this._wat = wat;
        this._initialize();
        
    }

    public get wat() {
        return this._wat;
    }

    public get prefix() {
        return this._prefix;
    }

    private async _initialize() {

        // Dyanmic Command
        try {
            console.log(`Mengimport file command...`);
            const commandFolderPath = path.join(__dirname, '../commands');
            const commandFiles = fs.readdirSync(commandFolderPath);
            for(const file of commandFiles) {
                if(file.endsWith('.ts') || file.endsWith('.js')) {
                    const filePath = path.join(commandFolderPath, file);
                    const command: ICommand = await import(filePath);
                    this._commands.push({
                        name: file.replace('.ts', '').replace('.js', ''),
                        execute: command.execute
                    });
                    console.log(`Import file command '${file}'...`);
                }
            }
        }catch(error) {
            console.error(`Error saat mengimport file command:`, error);
        }

    }

    async input(args: string[]) {

        if(args.length <= 0) return;

        const argsPrefix = args[0];
        const moreArgs = args.slice(1);
        let commandExecute = false;

        this._commands.forEach((command) => {
            if(argsPrefix === `${this._prefix}${command.name}`) {
                command.execute.apply(this, [moreArgs]);
                commandExecute = true;
                return;
            }
        });

        if(!commandExecute) this._wat.sendInfoToSelf(`Perintah ${argsPrefix} tidak ada.`);
    }

}