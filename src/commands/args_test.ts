import CommandHandler from "../core/CommandHandler";

export function execute(this: CommandHandler, args: string[]) {
    this.wat.sendSimpleTextToSelf(`Arguments:\n${args.join('\n')}`);
}