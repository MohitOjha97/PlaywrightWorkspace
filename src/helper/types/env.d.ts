export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER?: string,
            ENV?: string,
            ENVIRONMENT?: string,
            HEAD?: "true" | "false",
            APPLICATION?: string,
            ENDPOINT?: string,
            TAGS?: string,
            BROWSERSTACK_LOCAL?: "true" | "false",
            RELEASE_NAME?: string,
            PRODUCT_NAME?: string,
            BROWSERSTACK_USERNAME?: string,
            BROWSERSTACK_ACCESS_KEY?: string,
            PARALLEL_THREADS?: string,
        }
    }
}
