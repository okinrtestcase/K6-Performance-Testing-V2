const stagesMap = {
  smoke: [{ duration: "2s", target: 1 }],
  load: [
    { duration: "5s", target: 10 },
    { duration: "5s", target: 10 },
    { duration: "2s", target: 0 },
  ],
  stress: [
    { duration: "5s", target: 20 },
    { duration: "5s", target: 40 },
    { duration: "5s", target: 0 },
  ],
  spike: [
    { duration: "5s", target: 30 },
    { duration: "5s", target: 60 },
    { duration: "5s", target: 0 },
  ],
};

const thresholdsMap = {
  smoke: {
    http_req_duration: ["p(95)<3000"], // Smoke test tidak terlalu ketat
    http_req_failed: ["rate<0.3"],
  },
  load: {
    http_req_duration: ["p(95)<900"], // Load test lebih ketat
    http_req_failed: ["rate<0.2"],
  },
  stress: {
    http_req_duration: ["p(95)<1000"], // Stress test lebih longgar
    http_req_failed: ["rate<0.1"],
  },
  spike: {
    http_req_duration: ["p(95)<1200"],
    http_req_failed: ["rate<0.15"],
  },
};

export function getOptions(testType) {
  return {
    stages: stagesMap[testType],
    thresholds: thresholdsMap[testType] || thresholdsMap["smoke"], // default smoke
  };
}
