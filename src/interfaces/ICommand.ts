export default interface ICommand {
    execute: (args: string[]) => void;
}
