import { env } from "../core/Env";


export default {
    prefix: env('COMMAND_PREFIX', '/')
}