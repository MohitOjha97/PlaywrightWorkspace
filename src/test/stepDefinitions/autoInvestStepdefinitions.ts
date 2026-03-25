import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import CommonPageObjects from "../../pageObjects/CommonPageObjects";
import AffordabilityPage from "../../pageObjects/autoInvest/AffordabilityPage";
import { GlobalObjects } from "../../hooks/hooks";
import logger from "../../helper/utils/logger";

setDefaultTimeout(60 * 1000 * 5);
let commonPageObjects: CommonPageObjects;
let affordabilityPage: AffordabilityPage;

Given('User is on LogIn page', async function methodStart(this: GlobalObjects) {
    let url = "https://<<env>>.google.com";
    url = url.replace("<<env>>", process.env.ENVIRONMENT || "");
    await pageFixture.page.goto(url);
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.waitForPageLoad(20);
    await pageFixture.page.waitForLoadState('domcontentloaded');
    await expect(pageFixture.page, 'Incorrect Landing Page title is displayed').toHaveTitle("Log in - ii " + process.env.ENVIRONMENT);
});

When('User performs login using credentials {string} and {string}', async function (this: GlobalObjects, username, password) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.takeScreenshot("LogIn_Page", this.scenarioName);
    await pageFixture.page.waitForLoadState('domcontentloaded');
    await commonPageObjects.pausePageForSecs(20);
    await commonPageObjects.acceptCookies();
});

Then('Add query parameters and launch url for error validation', async function methodStart(this: GlobalObjects, dataTable) {
    const data = dataTable.hashes();
    let url = pageFixture.page.url();
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    for (const row of data) {
        const rowData = row.Input;
        const value = row.Value;
        url = await commonPageObjects.addQParamToURL(rowData, value, url);
    }
    await pageFixture.page.goto(url);
    await pageFixture.page.waitForLoadState('domcontentloaded');
    await commonPageObjects.pausePageForSecs(10);
});

Then('Landing page of Portfolio Partner should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
});

Given('User is on landing page', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('Validate Need to Know confirmation text list to be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('User clicks on Next button', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.clickNextBtn();
    await pageFixture.page.waitForLoadState('domcontentloaded');
});

Then('Knowlegde page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Knowledge");
});

Then('User selects their Experience with investing as {string}', async function (this: GlobalObjects, option: string) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('Personal Contributions page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Personal Contributions");
});

Then('User should be able to update Initial one off payment value as {string}', async function (this: GlobalObjects, value: string) {
    await pageFixture.page.locator("input#initialPayment").fill(value);
});

Then('User should be able to update ongoing monthly contributions value as {string}', async function (this: GlobalObjects, value: string) {
    await pageFixture.page.locator("input#monthlyContribution").fill(value);
});

Then('Affordability Page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Affordability");
});

Then('Valid error message should be displayed when no option is selected', async function (this: GlobalObjects) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    await affordabilityPage.validateNoOptionSelectedError();
});

Then('User selects option for Emergeny fund as {string} and has debt as {string} and has spare money as {string}', async function (this: GlobalObjects, emergencyFund: string, hasDebt: string, spareMoney: string) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    await affordabilityPage.selectEmergencyFund(emergencyFund);
    await affordabilityPage.selectHasDebt(hasDebt);
    await affordabilityPage.selectSpareMoney(spareMoney);
});

Then('User clicks check button', async function (this: GlobalObjects) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    await affordabilityPage.clickCheckBtn();
});

Then('User fills below details in Affordibility calculator section', async function (this: GlobalObjects, dataTable) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    const data = dataTable.hashes();
    let monthlyNetIncome = '', monthlyOutgoing = '', liquidAssets = '', totalDebts = '';
    for (const row of data) {
        switch (row.Input) {
            case 'Monthly net income': monthlyNetIncome = row.Value; break;
            case 'Monthly outgoing': monthlyOutgoing = row.Value; break;
            case 'Liquid assets': liquidAssets = row.Value; break;
            case 'Total debts': totalDebts = row.Value; break;
        }
    }
    await affordabilityPage.fillAffordabilityCalculator(monthlyNetIncome, monthlyOutgoing, liquidAssets, totalDebts);
});

Then('User click on Calculate button', async function (this: GlobalObjects) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    await affordabilityPage.clickCalculateBtn();
});

Then('Good to go page banner be displayed', async function (this: GlobalObjects) {
    affordabilityPage = new AffordabilityPage(pageFixture.page);
    await affordabilityPage.validateGoodToGoBanner();
});

Then('Investment Theme page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Investment Theme");
});

Then('User should be able to select how would you like to manage your investments option as {string}', async function (this: GlobalObjects, option: string) {
    await pageFixture.page.locator(`//label[contains(text(),'${option}')]`).click();
});

Then('Validate Cost of investments percent value for index investment option in range from {string} to {string}', async function (this: GlobalObjects, min: string, max: string) {
    const costText = await pageFixture.page.locator("div#costOfInvestments").textContent();
    logger.info(`Cost of investments: ${costText}`);
});

Then('Validate how would you like to manage your investments Find out More Section', async function (this: GlobalObjects) {
    await expect(pageFixture.page.locator("div#findOutMore")).toBeVisible();
});

Then('Risk level page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Risk level");
});

Then('User clicks Complete risk questionnaire button', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('User should be able to answer the risk questionnaire', async function (this: GlobalObjects, dataTable) {
    const data = dataTable.hashes();
    const answers: { [key: string]: string } = {};
    for (const row of data) {
        answers[row.Input] = row.Value;
    }
});

Then('User should be able to select the risk level as {string}', async function (this: GlobalObjects, level: string) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('User agrees for various consents', async function (this: GlobalObjects) {
    await pageFixture.page.locator("input[type='checkbox']").first().click();
});

Then('User clicks portfolio partner Complete Application button', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('User confirm by entering cvv number as {string}', async function (this: GlobalObjects, cvv: string) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('User clicks portfolio partner Next button', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    logger.info("User is on landing page");
});

Then('Account summary page should be displayed', async function (this: GlobalObjects) {
    commonPageObjects = new CommonPageObjects(pageFixture.page);
    await commonPageObjects.validateLandingPageHeader("Account summary");
});
