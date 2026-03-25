import { Page, expect } from "@playwright/test";
import CommonPageObjects from "../CommonPageObjects";

export default class AffordabilityPage {
    private base: CommonPageObjects;

    constructor(private page: Page) {
        this.base = new CommonPageObjects(page);
    }

    Elements = {
        emergencyFundYesOption: "//label[contains(text(),'Yes')][@for='emergencyFund-yes']",
        emergencyFundNoOption: "//label[contains(text(),'No')][@for='emergencyFund-no']",
        hasDebtYesOption: "//label[contains(text(),'Yes')][@for='hasDebt-yes']",
        hasDebtNoOption: "//label[contains(text(),'No')][@for='hasDebt-no']",
        spareMoneyYesOption: "//label[contains(text(),'Yes')][@for='spareMoney-yes']",
        spareMoneyNoOption: "//label[contains(text(),'No')][@for='spareMoney-no']",
        checkBtn: "button#check",
        calculateBtn: "button#calculate",
        monthlyNetIncomeInput: "input#monthlyNetIncome",
        monthlyOutgoingInput: "input#monthlyOutgoing",
        liquidAssetsInput: "input#liquidAssets",
        totalDebtsInput: "input#totalDebts",
        goodToGoBanner: "div#goodToGo",
        validErrorMessage: "div.NotificationPanel p",
        affordabilityPageHeader: "main#page h1",
    }

    async selectEmergencyFund(value: string) {
        if (value === "Yes") {
            await this.page.locator(this.Elements.emergencyFundYesOption).click();
        } else {
            await this.page.locator(this.Elements.emergencyFundNoOption).click();
        }
    }

    async selectHasDebt(value: string) {
        if (value === "Yes") {
            await this.page.locator(this.Elements.hasDebtYesOption).click();
        } else {
            await this.page.locator(this.Elements.hasDebtNoOption).click();
        }
    }

    async selectSpareMoney(value: string) {
        if (value === "Yes") {
            await this.page.locator(this.Elements.spareMoneyYesOption).click();
        } else {
            await this.page.locator(this.Elements.spareMoneyNoOption).click();
        }
    }

    async clickCheckBtn() {
        await this.page.locator(this.Elements.checkBtn).click();
    }

    async fillAffordabilityCalculator(monthlyNetIncome: string, monthlyOutgoing: string, liquidAssets: string, totalDebts: string) {
        await this.page.locator(this.Elements.monthlyNetIncomeInput).fill(monthlyNetIncome);
        await this.page.locator(this.Elements.monthlyOutgoingInput).fill(monthlyOutgoing);
        await this.page.locator(this.Elements.liquidAssetsInput).fill(liquidAssets);
        await this.page.locator(this.Elements.totalDebtsInput).fill(totalDebts);
    }

    async clickCalculateBtn() {
        await this.page.locator(this.Elements.calculateBtn).click();
    }

    async validateGoodToGoBanner() {
        await expect(this.page.locator(this.Elements.goodToGoBanner)).toBeVisible();
    }

    async validateNoOptionSelectedError() {
        await expect(this.page.locator(this.Elements.validErrorMessage)).toBeVisible();
    }
}
