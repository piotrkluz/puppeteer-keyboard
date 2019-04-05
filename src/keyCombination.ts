import * as USKeyboardLayout from "puppeteer-core/lib/USKeyboardLayout";
import { Page } from "puppeteer";

export class KeyCombination {
    private keys: string[];

    /**
     * @param keyString Examples: 
     * - [Enter]
     * - [Ctrl+Shift+A]
     * - ArrowLeft
     */
    constructor(private page: Page, keyString: string) {
        this.keys = keyString
            .replace(/[\[\]]/g, "")
            .replace("Ctrl", "Control") // some hack ;)
            .split("+")
            .map(e => e.trim());
        
        // validate
        for(const key of this.keys) {
            if(!this.isKeyboardKey(key)) {
                throw new Error(`Keys combination not recognized ${keyString}. 
                Key code "${key}" not exist in USKeyboardLayout
                Available key codes are here: https://github.com/GoogleChrome/puppeteer/blob/master/lib/USKeyboardLayout.js`)
            }
        }
    }

    /**
     * Type key combination in currently focused element.
     */
    async type(delayMs: number = 0) {
        const keysToRelease = [];

        for (const key of this.keys) {
            await this.page.keyboard.down(key);
            await this.wait(delayMs)

            keysToRelease.unshift(key);
        }

        for (const key of keysToRelease) {
            await this.page.keyboard.up(key);
            await this.wait(delayMs);
        }
    }

    private isKeyboardKey(key: string) {
        return USKeyboardLayout[key] !== undefined;
    }

    private wait(ms) {
        return ms > 0
            ? new Promise(res => setTimeout(res, ms))
            : null;
    }
}