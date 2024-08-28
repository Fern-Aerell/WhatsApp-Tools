import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {
    await this.wat.sendInfoToSelf(`Ini adalah pesan yang di kirim dari perintah test, beserta argument yang diberikan ${args}`);
}