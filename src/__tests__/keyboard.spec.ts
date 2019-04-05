import * as server from "./testServer/server";
import { Page } from "puppeteer";
import { Keyboard } from "../index";

declare var page: Page;
describe("typeText", () => {
    beforeAll(async () => {
        const port = await server.start();
        await page.goto("http://localhost:" + port);
    });

    afterAll(() => {
        server.stop();
    });

    it("simple text", async () => check(
        "simple",
        "simple"
    ))

    it("backspace", async () => check(
        "simple[Backspace]",
        "simpl"
    ))

    it("multiple backspace", async () => check(
        "simple[Backspace][Backspace]",
        "simp"
    ))

    it("Ctrl+A", async () => check(
        "simple[Ctrl+A][Backspace]",
        ""
    ))

    it("Home", async () => check(
        "simple[Home]AAA",
        "AAAsimple"
    ))

    it("Edit with Shift", async () => check(
        "aaaaa[Shift+ArrowLeft+ArrowLeft]b",
        "aaab"
    ))
})

async function check(keys: string, expectedResult: string) {
    const input = await page.$("input");
    await page.$eval("input", e => (<any>e).value = ""); //clear

    await new Keyboard(page).type(keys, input);

    const value = await page.$eval("input", e => (<any>e).value); //get value
    expect(value).toEqual(expectedResult);
}