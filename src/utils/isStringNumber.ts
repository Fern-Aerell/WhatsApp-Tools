export default function isStringNumber(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}