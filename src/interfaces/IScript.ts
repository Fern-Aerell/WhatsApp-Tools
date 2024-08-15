export default interface IScript {
    run: (args: string[]) => Promise<void>;
}
