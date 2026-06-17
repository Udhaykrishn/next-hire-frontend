const axios = require("axios");

async function test() {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/v1/auth/admin/login",
      {
        email: "admin@nexthire.ai",
        password: "password123",
      },
    );
    console.log("Login success:", res.data);
    const cookies = res.headers["set-cookie"];
    console.log("Cookies:", cookies);

    const candidatesRes = await axios.get("http://localhost:3001/api/v1/user", {
      headers: {
        Cookie: cookies.join(";"),
      },
    });
    console.log("Candidates success:", candidatesRes.data);
  } catch (err) {
    console.error("Error:", err.response?.status, err.response?.data);
  }
}
test();
