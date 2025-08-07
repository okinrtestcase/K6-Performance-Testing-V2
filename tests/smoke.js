import http from "k6/http";
const config = JSON.parse(open("../testData/data.json"));
import { checkResponse } from "../utils/checks.js";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";

export function smokeTest() {
  const response = http.get(`${config}/`);

  // Validate the response
  const isValid = checkResponse(response, 200);

  // Custom metrics
  const durationTrend = new Trend("http_req_duration{test_type:smoke}");
  const checksRate = new Rate("checks{test_type:smoke}");
  const errorCounter = new Counter("errors{test_type:smoke}");
  const responseSize = new Gauge("response_size{test_type:smoke}");

  // Record metrics
  durationTrend.add(response.timings.duration);
  checksRate.add(isValid);
  errorCounter.add(!isValid ? 1 : 0);
  responseSize.add(response.body.length);

  // Log the results
  console.log(
    `Smoke Test - URL: ${url}, Status: ${response.status}, Valid: ${isValid}`
  );
}
