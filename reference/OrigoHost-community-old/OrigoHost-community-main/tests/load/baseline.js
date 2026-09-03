import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 users
    { duration: "1m", target: 500 }, // Ramp up to 500 users
    { duration: "30s", target: 1000 }, // Stress spike
    { duration: "30s", target: 0 }, // Cool down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"], // 95% of requests < 500ms
    http_req_failed: ["rate<0.01"], // Errors < 1%
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL || "http://localhost:5173";

  // 1. Visit Homepage
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage loaded": (r) => r.status === 200,
  });
  sleep(1);

  // 2. Visit Events
  const eventsRes = http.get(`${BASE_URL}/events`);
  check(eventsRes, {
    "events page loaded": (r) => r.status === 200,
  });
  sleep(1);

  // 3. Visit Contact Page
  const contactRes = http.get(`${BASE_URL}/contact`);
  check(contactRes, {
    "contact page loaded": (r) => r.status === 200,
  });
  sleep(1);
}
