const API_KEY = "AIzaSyCBHyyofcXxPH1YpBNKXMGnEQ8NmmjhsUg";


export const getGeminiResponse = async (userInput) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      throw new Error("Invalid API response structure");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error: API request failed. Check your API key and network.";
  }
};