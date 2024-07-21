import CommandHandler from "../core/CommandHandler";

export function execute(this: CommandHandler, args: string[]) {
    this.wat.sendSimpleTextToSelf('Halo Dunia!');
}