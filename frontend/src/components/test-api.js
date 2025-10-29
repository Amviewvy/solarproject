// test-api.js
const testAPI = async () => {
  try {
    const url = "http://localhost:3000/measurements/?meter_id=1&start=2025-10-15&end=2025-10-17";
    console.log("Testing API:", url);
    
    const response = await fetch(url);
    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Response:", data);
    } else {
      console.log("❌ API Error:", await response.text());
    }
  } catch (error) {
    console.log("❌ Fetch Error:", error.message);
  }
};

testAPI();