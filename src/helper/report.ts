const report = require("multiple-cucumber-html-reporter");

import * as dotenv from "dotenv";
dotenv.config({ path: "src/helper/env/.env.cfg", override: true });

const date = new Date();
const reportName = getReportName();
const releaseName = process.env.RELEASE_NAME;
const environment = process.env.ENVIRONMENT;
const tags = process.env.TAGS;
const browser = process.env.BROWSER;
const productName = process.env.PRODUCT_NAME;

report.generate({
    jsonDir: "test-results",
    reportPath: "./test-results/",
    reportName,
    pageTitle: reportName,
    displayDuration: true,
    durationInMs: true,
    disableLog: true,
    displayReportTime: true,
    displayTime: true,
    hideMetadata: true,
    customMetadata: true,
    metadata: {
        browser: { name: browser, version: "-" },
        platform: {
            name: process.platform,
            architecture: process.arch
        },
    },
    customData: {
        title: "Run Info",
        data: [
            { label: "Project", value: "Managed Products" },
            { label: "Release Name", value: releaseName },
            { label: "Release Time", value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` },
            { label: "Environment", value: environment },
            { label: "Scenario Name", value: (tags ?? "unknown").replace(/^@/, "") },
            { label: "Product Name", value: productName },
            { label: "Browser", value: browser },
        ],
    },
});

function getReportName() {
    return "Manage Products Execution Report";
}
