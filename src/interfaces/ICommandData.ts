export default interface ICommandData {
    name: string,
    execute: (args: string[]) => void
};