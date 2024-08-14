import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {

    if(!(args.length > 0)) {
        await this.wat.sendErrorToSelf('Silahkan setidak nya masukkan 1 argument pada paerintah /number.');
        return;
    }

    if(args.length == 2 && args[0] == 'check') {
        await this.wat.sendInfoToSelf('Mohon menunggu saya akan melakukan pengecekan');
        try {
            const numbers = args[1].split('\n');
            let result = '';
            for (const number of numbers) {
                if (await this.wat.numberCheck(number)) {
                    result += `${number}\n`;
                } else {
                    result += `${number} (Tidak terdaftar)\n`;
                }
            }
            await this.wat.sendInfoToSelf('Berikut hasil pengecekan nomor hp yang saya lakukan');
            await this.wat.sendNoWatermarkTextToSelf(result);
        } catch (error) {
            await this.wat.sendErrorToSelf(`Terjadi kesalahan saat melakukan pengecekan: ${(error as Error).message}`);
        }
        return;
    }

    this.wat.sendErrorToSelf(`Perintah /service tidak dapat menerima argument '${args[0]}'.`);
}