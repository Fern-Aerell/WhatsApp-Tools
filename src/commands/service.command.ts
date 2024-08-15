import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {

    if(!(args.length > 0)) {
        this.wat.sendErrorToSelf('Silahkan setidak nya masukkan 1 argument pada perintah /service.');
        return;
    }

    if(args.length == 1 && args[0] == 'stop') {
        this.wat.stop();
        return;
    }

    this.wat.sendErrorToSelf(`Perintah /service tidak dapat menerima argument '${args[0]}'.`);
}