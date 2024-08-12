import CommandHandler from "../core/CommandHandler";

export async function execute(this: CommandHandler, args: string[]) {
    this.wat.sendWatermarkTextToSelf(`Arguments:\n${args.join('\n')}`);
}