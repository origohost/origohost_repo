fetch(
  "http://localhost:5180/_server/?serverFnId=submitHostEventEmailFn&serverFnName=submitHostEventEmailFn",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        organizationName: "Test Org",
        fullName: "Test User <script>alert(1)</script>",
        email: "test@example.com",
        phone: "1234567890",
        role: "CEO",
        eventType: "Workshop",
      },
    }),
  },
)
  .then((r) => {
    console.log("Host Event Status:", r.status);
    return r.text();
  })
  .then(console.log)
  .catch(console.error);
