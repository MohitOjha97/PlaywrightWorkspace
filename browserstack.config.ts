const { chromium } = require('@playwright/test');
const BrowserStackLocal = require('browserstack-local');

const clientPlaywrightVersion: string = require('playwright/package.json').version;

const date = new Date();
const buildName =
    process.env.PRODUCT_NAME + '-' + `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` + ' ' + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

/**
 * BrowserStack Specific Capabilities.
 */
const caps = {
    browser: 'chrome',
    os: 'OS X',
    os_version: "Ventura",
    name: process.env.PRODUCT_NAME,
    build: buildName,
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.local': process.env.BROWSERSTACK_LOCAL,
    'browserstack.localIdentifier': "Portfolio",
    'client.playwrightVersion': clientPlaywrightVersion,
    'ignoreHTTPSErrors': true,
    'browserstack.networkLogs': true,
    'resolution': '1920x1080',
    'browserstack.video': true
};

exports.bsLocal = new BrowserStackLocal.Local();
exports.BS_LOCAL_ARGS = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    "localIdentifier": "MohitWorkSpace",
};

/**
 * Patching the capabilities dynamically according to the project name.
 * @param name
 * @param title
 */
const patchCaps = (name: string, title: string): void => {
    let combination = name.split(/@browserstack/)[0];
    let [browserCaps, osCaps] = combination.split(/:/);
    let [browser, browser_version] = browserCaps.split(/@/);
    let osCapsSplit = osCaps.split(/ /);
    let os = osCapsSplit.shift();
    let os_version = osCapsSplit.join(' ');
    caps.browser = browser ? browser : 'chrome';
    caps.os_version = browser_version ? browser_version : 'latest';
    caps.os = os ? os : 'osx';
    caps.os_version = os_version ? os_version : 'catalina';
    caps.name = title;
};

exports.getCdpEndpoint = (name: string, title: string): string => {
    patchCaps(name, title);
    console.log(" capssss---------" + JSON.stringify(caps));
    const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
    return cdpUrl;
}
