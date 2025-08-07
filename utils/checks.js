import { check } from "k6";

export function checkResponse(response, expectedStatus) {
  const isStatusValid = response.status === expectedStatus;

  const message = `Validating status code: expected ${expectedStatus}, received ${response.status}`;
  check(response, {
    [message]: () => isStatusValid,
  });
}

export function checkResponseKeys(response, requiredKeys = []) {
  const body = response.json();

  requiredKeys.forEach((key) => {
    const message = `Checking response body contains key: "${key}"`;
    check(response, {
      [message]: () => body.hasOwnProperty(key),
    });
  });
}

export function checkKeyValue(response, expectedObj) {
  const body = JSON.parse(response.body);
  return check(response, {
    ...Object.entries(expectedObj).reduce((acc, [key, expectedValue]) => {
      acc[`${key} should be '${expectedValue}'`] = () =>
        body[key] === expectedValue;
      return acc;
    }, {}),
  });
}
