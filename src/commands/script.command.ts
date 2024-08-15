import CommandHandler from "../core/CommandHandler";
import fs from 'fs';
import path from 'path';
import IScript from "../interfaces/IScript";

export async function execute(this: CommandHandler, args: string[]) {

    if(!(args.length > 0)) {
        this.wat.sendErrorToSelf('Silahkan setidak nya masukkan 1 argument pada perintah /script.');
        return;
    }

    const scriptFolderPath = path.join(__dirname, './scripts');
    const scriptFiles = fs.readdirSync(scriptFolderPath);

    const scriptFile = scriptFiles.find((file) => file.startsWith(args[0]) && (file.endsWith('.script.ts') || file.endsWith('.script.js')));

    if(!scriptFile) {
        this.wat.sendErrorToSelf(`Tidak ada script dengan nama '${args[0]}'.`);
        return;
    }

    const scriptFilePath = path.join(scriptFolderPath, scriptFile);
    const script: IScript = await import(scriptFilePath);

    await script.run.apply(this.wat, [args.slice(1, args.length)]);
}