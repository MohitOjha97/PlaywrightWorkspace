import { Page, expect } from "@playwright/test";
import CommonPageObjects from "../CommonPageObjects";
import logger from "../../helper/utils/logger";
import { MPValidationsEnum } from "../../helper/utils/MPValidationsEnum";

export default class MP_AboutYouPage {
    private base: CommonPageObjects;
    constructor(private page: Page) {
        this.base = new CommonPageObjects(page);
    }

    Elements = {
        dobDayInput: "input#dateofbirth_dp-day",
        dobMonthInput: "input#dateofbirth_dp-month",
        dobYearInput: "input#dateofbirth_dp-year",
    }

    async enterDateOfBirth(dob_MMDDYYYY: string) {
        let ddmmyyyy: string[] = dob_MMDDYYYY.split("-");
        if (ddmmyyyy.length != 3) {
            logger.error("Invalid Date of Birth format. Please check format should be like \"DD-MM-YYYY like 01-01-2000\" passed date :" + dob_MMDDYYYY);
        } else {
            await this.page.locator(this.Elements.dobDayInput).fill(ddmmyyyy[0]);
            await this.page.locator(this.Elements.dobMonthInput).fill(ddmmyyyy[1]);
            await this.page.locator(this.Elements.dobYearInput).fill(ddmmyyyy[2]);
            await this.page.keyboard.press('Tab');
        }
    }

    /**
     * Validates when user tries to navigate to next page without
     * selecting any of the investment experience option
     */
    async validateNoInvestmentExperienceMsg() {
        expect(await this.base.isMPErrorMessagePresent(MPValidationsEnum.optionSelectionMsg)).toBeTruthy;
    }

    async enterDateForDOB(dob_dd: string) {
        await this.page.locator(this.Elements.dobDayInput).fill(dob_dd);
    }

    async enterMonthForDOB(dob_mm: string) {
        await this.page.locator(this.Elements.dobMonthInput).fill(dob_mm);
    }
}
