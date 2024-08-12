export default interface ICommand {
    execute: (args: string[]) => Promise<void>;
}
