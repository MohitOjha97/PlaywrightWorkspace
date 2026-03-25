require("dotenv").config({ path: "src/helper/env/.env.cfg" });

const threads = Number(process.env.PARALLEL_THREADS || 1);

module.exports = {
    default: {
        paths: ["src/test/features/"],
        require: [
            "src/test/stepDefinitions/*.ts",
            "src/hooks/hooks.ts"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json"
        ],
        formatOptions: { snippetInterface: "async-await" },
        tags: process.env.TAGS || "",
        parallel: threads,
        requireModule: ["ts-node/register"]
    }
};
