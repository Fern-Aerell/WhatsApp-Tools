import { CountryCode, isSupportedCountry } from "libphonenumber-js";
import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {

    if(!(args.length > 0)) {
        await this.wat.sendErrorToSelf('Silahkan setidak nya masukkan 1 argument pada perintah /number.');
        return;
    }

    if(args.length == 3 && args[1] === 'check') {
        await this.wat.sendInfoToSelf('Mohon menunggu saya akan melakukan pengecekan, untuk info proses nya bisa dilihat di terminal.');
        try {

            if(!isSupportedCountry(args[0])) {
                throw new Error(`Country code '${args[0]}' is not supported.`);
            }

            const numbers = args[2].split('\n');
            let result = '';

            let i = 1;
            console.log('Melakukan pengecekan nomor...')
            for (const number of numbers) {
                const numberCheckCounter = `(${i}/${numbers.length})`;
                process.stdout.write(`${numberCheckCounter} | ${number} checking...\r`);
                if (await this.wat.numberCheck(number, args[0])) {
                    console.log(`${numberCheckCounter} | ${number} terdaftar...\r`);
                    result += `${number}\n`;
                } else {
                    console.log(`${numberCheckCounter} | ${number} tidak terdaftar...\r`);
                    result += `${number} (Tidak terdaftar)\n`;
                }
                i++;
            }
            console.log('Pengecekan nomor selesai...');
            
            console.log('Mengirim hasil pengecekan ke whatsapp...');
            await this.wat.sendInfoToSelf('Berikut hasil pengecekan nomor hp yang saya lakukan');
            await this.wat.sendNoWatermarkTextToSelf(result);

        } catch (error) {
            await this.wat.sendErrorToSelf(`Terjadi kesalahan saat melakukan pengecekan: ${(error as Error).message}`);
        }
        return;
    }

    this.wat.sendErrorToSelf(`Perintah /number tidak dapat menerima argument '${args[0]}'.`);
}