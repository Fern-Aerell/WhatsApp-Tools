import { configDotenv } from 'dotenv';
configDotenv();

export function env(key: string, defaultValue: string): string {
    return process.env[key] ?? defaultValue;
}