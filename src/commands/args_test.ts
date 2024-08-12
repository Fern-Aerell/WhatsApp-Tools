import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {
    console.log(args);
    this.wat.sendWatermarkTextToSelf(`Arguments:\n${args.join('\n')}`);
}