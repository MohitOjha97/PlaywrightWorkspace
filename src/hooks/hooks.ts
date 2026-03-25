import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getBsLocal, getBsTeardown, getEnv } from "../helper/env/env";
import * as dotenv from "dotenv";

dotenv.config({ path: "src/helper/env/.env.cfg", override: true });

export interface GlobalObjects {
    browser: Browser;
    context: BrowserContext;
    originalPage: Page;
    currentPage: Page;
    scenarioName: string;
}

let bsStarted = false;
const MAX_BS_REASON = 240;

BeforeAll(async function () {
    getEnv();
});

function tagNameToBSSession(): string {
    const tags = (process.env.TAGS || "").split(";")[0].trim();
    return tags.startsWith("@") ? tags.substring(1) : tags || "scenario";
}

Before(async function ({ pickle }) {
    if (!bsStarted && process.env.BROWSER?.startsWith("bs")) {
        await getBsLocal();
        bsStarted = true;
    }

    this.browser = await invokeBrowser();
    this.context = await this.browser.newContext({ ignoreHTTPSErrors: true });
    this.originalPage = await this.context.newPage();
    this.currentPage = this.originalPage;
    pageFixture.page = this.originalPage;
    const baseName = pickle.name.split(";")[0];
    this.scenarioName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_") || "scenario";
    if (process.env.BROWSER?.startsWith("bs")) {
        const tag = tagNameToBSSession();

        const sessionDetailsStr = await this.currentPage.evaluate(
            undefined,
            `browserstack_executor: ${JSON.stringify({ action: "getSessionDetails" })}`
        );
        const sessionDetails = JSON.parse(sessionDetailsStr as string);
        const currentSessionName: string = sessionDetails?.name || "";
        const finalName = currentSessionName.startsWith(`${this.scenarioName}-`) ? currentSessionName : `${this.scenarioName}-${currentSessionName || "Session"}`;
        await this.currentPage.evaluate(
            undefined,
            `browserstack_executor: ${JSON.stringify({
                action: "setSessionName",
                arguments: { name: finalName }
            })}`
        );
    }
});

AfterStep(async function ({ pickle }) {
    const baseName = pickle.name.split(";")[0];
    const screenshotName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");

    const img = await this.currentPage.screenshot({
        path: `./test-results/screenshots/${screenshotName}/${screenshotName}.png`,
        type: "png",
        fullPage: true
    });
    await this.attach(img, "image/png");
});

After(async function ({ result }) {
    const scenario = this.scenarioName;

    if (result?.status === Status.FAILED) {
        const img = await this.currentPage.screenshot({
            path: `./test-results/screenshots/${scenario}/failout.png`,
            type: "png",
            fullPage: true
        });
        await this.attach(img, "image/png");
    }

    // BrowserStack session status update
    const status = result?.status === Status.PASSED ? "passed" : "failed";
    const errMsg =
        result?.message ||
        result?.exception?.message ||
        (status === "passed" ? "Scenario passed" : "Scenario failed");

    await setBsStatus(this.currentPage, status, errMsg);

    try {
        await this.context?.close();
    } catch { }
    try {
        await this.browser?.close();
    } catch { }
});

AfterAll(async function () {
    await getBsTeardown();
});

function errorMessage(errMsg: any): string {
    if (!errMsg) return "Scenario failed";

    let reason = String(errMsg).replace(/\s+/g, " ").replace(/\//g, "'").trim();

    if (reason.length > MAX_BS_REASON) {
        reason = reason.substring(0, MAX_BS_REASON - 3) + "...";
    }
    return reason;
}

async function setBsStatus(
    page: Page | undefined,
    status: "passed" | "failed",
    errMessage: string
) {
    if (!page || !process.env.BROWSER?.startsWith("bs")) return;

    const reason = errorMessage(errMessage);

    try {
        await page.evaluate(
            `browserstack_executor: ${JSON.stringify({
                action: "setSessionStatus",
                arguments: { status, reason }
            })}`
        );
    } catch (err) {
        console.log("BrowserStack status update failed:", err);
    }
}
