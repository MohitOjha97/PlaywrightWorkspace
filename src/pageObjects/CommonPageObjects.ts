import { Page, expect } from "@playwright/test";
import { PHCValidationsEnum } from "../helper/utils/PHCValidationsEnum";
import { pageFixture } from "../hooks/pageFixture";
import logger from "../helper/utils/logger";
import { PortfolioPartnerEnums } from "../helper/utils/PortfolioPartnerEnums";

export default class CommonPageObjects {

    constructor(private page: Page) { }

    Elements = {
        nextBtn: "button#ok",
        backBtn: "button#back",
        pageHeader: "main#page h1",
        settingsBtn: "div[class = 'settings-menu-button'] svg",
        logOutLink: "a#logout-header-link svg",
        errorNotificationPanelTxt: "div[class='-3Xn41f+1Fu84cPWDoGMMg=='] p",
        assumptionsNotificationPanelTxt: "div.NotificationPanel h4",
        clearBtn: "a#reset-header-link",
        ppStartTestTitle: "//p[.-'This is a test page to start the Portfolio Partner ISA journey. The buttons below will start the journey.']",
        loadErrorMessageErrorPage1: "main#page h2",
        loadErrorMessageErrorPage2: "main#page h1",
        errorMessageErrorPage: "main#page p",
        returnToHomePageBtn: "button#return-to-home",
        contactUSBtn: "main#page p a",
        refreshBtn: "button#refresh span",
        iiApiError: "div.NotificationPanel p",
        iiApiLoadPopUpErr: "h2#overlay-title-1",
        failToLoadRiskAnswerErr: "div[data-component = 'CloseablePanel'] div div h4",
        retryPostRiskAnsBtn: "button#retryPostQuestions span",

        mISAAccAcceptCookies: "//button[.-'Accept']",
        laterBtnOnLogOnPage: "a#later",
        acceptCookieBtn: "button#onetrust-accept-btn-handler",

        // Managepension error message elements
        mpErrorNotificationPanelTxt: "//div[@data-component-class='NotificationPanel']//div//p",
    }

    async goToUrl(url: string) {
        logger.info("Launching the web page URL \"" + url + "\"");
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitForPageLoad(timeout: number) {
        await this.page.waitForTimeout(timeout * 1000);
    }

    async pausePageForSecs(secs: number) {
        await this.page.waitForTimeout(secs * 1000);
    }

    async takeScreenshot(pageName: string, scenarioName: string) {
        await this.page.screenshot({
            path: `./test-results/screenshots/${scenarioName}/${pageName}.png`,
            fullPage: true
        });
    }

    async acceptCookies() {
        try {
            const cookieBtn = this.page.locator(this.Elements.acceptCookieBtn);
            if (await cookieBtn.isVisible({ timeout: 5000 })) {
                await cookieBtn.click();
            }
        } catch {
            // Cookies button not present
        }
    }

    async decodeBase64(encoded: string): Promise<string> {
        return Buffer.from(encoded, 'base64').toString('utf-8');
    }

    async addQParamToURL(param: string, value: string, url: string): Promise<string> {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${param}=${value}`;
    }

    async isErrorMessagePresent(message: string): Promise<boolean> {
        try {
            const el = this.page.locator(this.Elements.errorNotificationPanelTxt);
            await el.waitFor({ timeout: 5000 });
            const text = await el.textContent();
            return text?.includes(message) ?? false;
        } catch {
            return false;
        }
    }

    async isMPErrorMessagePresent(message: string): Promise<boolean> {
        try {
            const el = this.page.locator(this.Elements.mpErrorNotificationPanelTxt);
            await el.waitFor({ timeout: 5000 });
            const text = await el.textContent();
            return text?.includes(message) ?? false;
        } catch {
            return false;
        }
    }

    async validateLandingPageHeader(expectedHeader: string) {
        const header = this.page.locator(this.Elements.pageHeader);
        await expect(header).toContainText(expectedHeader);
    }

    async clickNextBtn() {
        await this.page.locator(this.Elements.nextBtn).click();
    }

    async clickBackBtn() {
        await this.page.locator(this.Elements.backBtn).click();
    }
}
