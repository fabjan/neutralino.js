import { sendMessage } from '../ws/websocket';

export interface OpenActionOptions {
    url: string;
}

export interface RestartOptions {
    args: string;
}

export function exit(code?: number): Promise<void> {
    return sendMessage('app.exit', { code });
};

export function killProcess(): Promise<void> {
    return sendMessage('app.killProcess');
};

export function restartProcess(options?: RestartOptions): Promise<void> {
    return new Promise(async (resolve: () => void) => {
        let command = window.NL_ARGS.reduce((acc: string, arg: string) => {
            acc += ' ' + arg;
            return acc;
        }, '');

        if(options?.args) {
            command += ' ' + options.args;
        }

        await Neutralino.os.execCommand(command, {background: true});
        Neutralino.app.exit();
        resolve();
    });
};

export function getConfig(): Promise<any> {
    return sendMessage('app.getConfig');
};

export function broadcast(event: string, data?: any): Promise<void> {
    return sendMessage('app.broadcast', {event, data});
};
