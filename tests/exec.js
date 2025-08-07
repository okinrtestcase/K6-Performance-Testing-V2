import http from "k6/http";
import {
  checkResponse,
  checkResponseKeys,
  checkKeyValue,
} from "../utils/checks.js";
const config = JSON.parse(open("../testData/data.json"));
import { generateRandomUser } from "../utils/generator.js";

export function registerSuccessfull() {
  // Register Successful
  console.log("\nRegister Successful");
  const url = `${config.baseURL}/register`;
  const payload = JSON.stringify({
    email: config.auth_register.email,
    password: config.auth_register.password1,
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": config.auth_register.api_key,
  };

  const res = http.post(url, payload, { headers });
  console.log(`status code: ${res.status}`);
  checkResponse(res, 200);
  checkResponseKeys(res, ["id", "token"]);
}

export function registerUnsuccessfull() {
  // register Unsuccessfull
  console.log("\nRegister Unsuccessful");
  const url = `${config.baseURL}/register`;
  const payload = JSON.stringify({
    email: config.auth_register.email_invalid,
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": config.auth_register.api_key,
  };

  const res = http.post(url, payload, { headers });
  console.log(`status code: ${res.status}`);
  checkResponse(res, 400);
}

export function loginSuccessfull() {
  // login Successfull
  console.log("\nLogin Successful");
  const url = `${config.baseURL}/login`;
  const payload = JSON.stringify({
    email: config.auth_register.email_invalid,
    password: config.auth_register.password2,
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": config.auth_register.api_key,
  };

  const res = http.post(url, payload, { headers });
  const token = JSON.parse(res.body).token;
  // const token = responseBody.token;
  console.log(`Token: ${token}`);

  console.log(`status code: ${res.status}`);
  checkResponse(res, 200);
  checkResponseKeys(res, ["token"]);
}
export function loginUnsuccessfull() {
  // login Unsuccessfull
  console.log("\nLogin Unsuccessful");
  const url = `${config.baseURL}/login`;
  const payload = JSON.stringify({
    email: config.auth_register.email_invalid,
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": config.auth_register.api_key,
  };

  const res = http.post(url, payload, { headers });
  console.log(`status code: ${res.status}`);
  checkResponse(res, 400);
}

export function createUser() {
  // Create User
  // console.log("\nCreate User");

  const { name, job } = generateRandomUser();
  const url = `${config.baseURL}/users`;
  const payload = JSON.stringify({
    name: name,
    job: job,
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": config.auth_register.api_key,
  };

  const res = http.post(url, payload, { headers });
  // console.log(`status code: ${res.status}`);
  checkResponse(res, 201);
  checkResponseKeys(res, ["name", "job", "id", "createdAt"]);
  checkKeyValue(res, { name, job });
}
