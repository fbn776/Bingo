import chalk from "chalk";

function formatDate(unixTime: number) {
    const now = new Date(unixTime);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}


/**
 * Used for basic logging to stdout (console)
 */
export default class Logger {
    private static defaultText(type: "error" | "warn" | "info" | "success" | "other") {
        let typeMsg: string;
        switch (type) {
            case "error":
                typeMsg = chalk.red(type);
                break;
            case "warn":
                typeMsg = chalk.yellow(type);
                break;
            case "info":
                typeMsg = chalk.blue(type);
                break;
            case "success":
                typeMsg = chalk.green(type);
                break;
            default:
                typeMsg = type;
        }

        return `${chalk.bold.bgBlue.white(formatDate(Date.now()))} | ${chalk.bold(typeMsg)} |`
    }

    /**
     * Logs an error message to the console (stderr)
     * @param args
     */
    static error(...args: any[]) {
        console.error(this.defaultText('error'), ...args);
    }

    /**
     * Logs a warning message to the console (stderr)
     * @param args
     */
    static warn(...args: any[]) {
        console.error(this.defaultText('warn'), ...args);
    }

    /**
     * Logs a success message to the console (stdout)
     * @param args
     */
    static success(...args: any[]) {
        console.log(this.defaultText('success'), ...args)
    }

    /**
     * Logs a message to the console (stdout)
     * @param args
     */
    static log(...args: any[]) {
        console.log(this.defaultText('other'), ...args);
    }

    /**
     * Logs an info message to the console (stdout)
     * @param args
     */
    static info(...args: any[]) {
        console.info(this.defaultText('info'), ...args);
    }
}