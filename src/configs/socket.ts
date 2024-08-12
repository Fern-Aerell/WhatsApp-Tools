import pino from 'pino';
import { env } from '../core/Env';

export default <{
    authFolderName: string,
    printQRInTerminal: boolean,
    browser: [string, string, string],
    logger: ReturnType<typeof pino>
}>{
    authFolderName: env('AUTH_FOLDER_NAME', 'authentication'),
    printQRInTerminal: env('SOCKET_PRINT_QR_IN_TERMINAL', 'true') === 'true',
    browser: [
        env('SOCKET_BROWSER_OS', 'WhatsApp Tools'),
        env('SOCKET_BROWSER_NAME', 'Browser'),
        env('SOCKET_BROWSER_VERSION', '1.0.0')
    ],
    logger: pino({
        level: env('SOCKET_LOGGER_PINO_LEVEL', 'silent'),
        transport: {
            target: env('SOCKET_LOGGER_PINO_TRANSPORT_TARGET', 'pino-pretty')!,
            options: {
                colorize: env('SOCKET_LOGGER_PINO_TRANSPORT_OPTIONS_COLORIZE', 'true') === 'true'
            }
        }
    })
}