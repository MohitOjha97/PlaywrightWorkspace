import * as dotenv from 'dotenv'
const { bsLocal, BS_LOCAL_ARGS } = require('../../../browserstack.config');
const { promisify } = require("util");

export const getEnv = () => {
  dotenv.config({
    override: true,
    path: `src/helper/env/.env.cfg`
  })
}

const sleep = promisify(setTimeout);
const redColour = "\x1b[31m";
const whiteColour = "\x1b[0m";

export const getBsLocal = async () => {
  if (process.env.BROWSERSTACK_LOCAL === "true") { //process.env.BROWSERSTACK_LOCAL === "true"
    //console.log("Starting BrowserStackLocal ...");
    // Starts the Local instance with the required arguments
    let localResponseReceived = false;
    console.log("BS_LOCAL_ARGS======>" + JSON.stringify(BS_LOCAL_ARGS));
    bsLocal.start(BS_LOCAL_ARGS, (err: Error | null) => {
      if (err) {
        console.error(
          `${redColour}Error starting BrowserStackLocal: ${err.message}${whiteColour}`
        );
      } else {
        console.log("BrowserStackLocal Started");
      }
      localResponseReceived = true;
    });
    while (!localResponseReceived) {
      await sleep(1000);
    }
  } else {
    console.log("Executing test using local browser...");
  }
};

export const getBsTeardown = async () => {
  // Stop the Local instance after your test run is completed, i.e after driver.quit
  let localStopped = false;

  if (bsLocal && bsLocal.isRunning()) {
    bsLocal.stop(() => {
      localStopped = true;
      console.log('Stopped BrowserStackLocal');
    });
    while (!localStopped) {
      await sleep(1000);
    }
  }
}
