import WhatsAppTools from "../../core/WhatsAppTools";

export async function run(this: WhatsAppTools, args: string[]) {
    await this.sendInfoToSelf(`Ini adalah pesan yang di kirim dari skrip test, beserta argument yang diberikan ${args}`);
}