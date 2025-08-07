import { sleep } from "k6";
import { getOptions } from "./utils/scenario.js";

const testType = __ENV.TEST || "smoke";
const scenario = require(`./tests/exec.js`);

export const options = getOptions(testType);

export default function () {
  // scenario.registerSuccessfull();
  // scenario.registerUnsuccessfull();
  // scenario.loginSuccessfull();
  // scenario.loginUnsuccessfull();
  scenario.createUser();
  sleep(1);
}
