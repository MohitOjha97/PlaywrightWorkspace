import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
const { getCdpEndpoint } = require('../../../browserstack.config');
require("dotenv").config({ path: "src/helper/env/.env.cfg" });

const options: LaunchOptions = {
    "headless": false
}

export const invokeBrowser = () => {

    const browserType = process.env.BROWSER;
    const scenarioTag = process.env.TAGS;
    console.log("Scenario currently being executed is: " + scenarioTag);
    console.log("Browser currently being used is: " + browserType);

    const cleanScenarioTag = scenarioTag ? scenarioTag : "unknown-scenario";
    let scenarioName = cleanScenarioTag.startsWith("@") ? cleanScenarioTag.substring(1) : cleanScenarioTag;

    const date = new Date();
    // Format: DD/MM/YYYY
    scenarioName = scenarioName + '-' + `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        case "bsWin11Chr":
            return chromium.connect(getCdpEndpoint('chrome:Windows 11', scenarioName + "_" + 'Win11Chrome'));
        case "bsWin11Fx":
            return firefox.connect(getCdpEndpoint('playwright-firefox:Windows 11', scenarioName + "_" + 'Win11Firefox'));
        case "bsWin10Chr":
            return chromium.connect(getCdpEndpoint('chrome:Windows 10', scenarioName + "_" + 'Win10Chrome'));
        case "bsWin10Fx":
            return firefox.connect(getCdpEndpoint('playwright-firefox:Windows 10', scenarioName + "_" + 'Win10Firefox'));
        case "bsOsXMontFx":
            return firefox.connect(getCdpEndpoint('playwright-firefox:OSX Monterey', scenarioName + "_" + 'OsXMontFirefox'));
        case "bsOsXMontWk":
            return webkit.connect(getCdpEndpoint('playwright-webkit:OSX Monterey', scenarioName + "_" + 'OsXMontWebkit'));
        case "bsOsXMontChr":
            return chromium.connect(getCdpEndpoint('chrome:OSX Monterey', scenarioName + "_" + 'OsXMontChrome'));
        case "bsOsXVentFx":
            return firefox.connect(getCdpEndpoint('playwright-firefox:OSX Ventura', scenarioName + "_" + 'OsXVentFirefox'));
        case "bsOsXVentWk":
            return webkit.connect(getCdpEndpoint('playwright-webkit:OSX Ventura', scenarioName + "_" + 'OsXVentWebkit'));
        case "bsOsXVentChr":
            return chromium.connect(getCdpEndpoint('chrome:OSX Ventura', scenarioName + "_" + 'OsXVentChrome'));
        default:
            throw new Error("Please set the correct browser!")
    }
}
