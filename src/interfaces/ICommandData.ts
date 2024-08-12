export default interface ICommandData {
    name: string,
    execute: (args: string[]) => Promise<void>
};