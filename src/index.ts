import { Page, ElementHandle } from "puppeteer";
import { KeyCombination } from "./keyCombination";

export class Keyboard {
    constructor(private page: Page, private options: {delay: number} = {delay: 0}) {}
    /**
     * @param text Text to type, examples:
     * - Some text
     * - Some text[Ctrl+A][Backspace]other text
     * - mark[Ctrl+Shift+ArrowLeft]
     * @param element Page element to be focused. If not set - text will be typed in currently focused element.
     */
    async type(text: string, element: ElementHandle = null) {
        if(element && typeof element.focus === "function") {
            await element.focus();
        }

        const parts = this.splitText(text);
        for(const part of parts) {
            this.isKeyCombination(part)
                ? await this.typeKeyCombination(part)
                : await this.typeText(part);
        }
    }

    /**
     * Splits text to fragments, example:
     * "text[Shift]other[Ctrl+S]"
     * -> will split into array: ["text", "[Shift]", "other", "[Ctrl+S]" ]
     * @param text
     */
    private splitText(text: string) {
        return text.match(/(?:\[.*?\]|[^\[\]]+)/g);
    }

    /**
     * Checks is string is in braces like: "[Something]"
     */
    private isKeyCombination(text: string) {
        return /\[.*?\]/.test(text);
    }

    private async typeText(text: string) {
        await this.page.keyboard.type(text, this.options);
    }

    private async typeKeyCombination(text: string) {
        const delay = this.options && this.options.delay && 0;

        await new KeyCombination(this.page, text).type(delay);
    }
}