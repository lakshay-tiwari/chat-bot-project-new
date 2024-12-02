// // Dummy API function that simulates API response
// export const getChatResponse = async (question) => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   // Dummy responses - Replace this with actual API call
//   const responses = {
//     "hello": "Hello! How can I help you with your health today?",
//     "how are you": "I'm doing well! How can I assist you with your health concerns?",
//     "what is diabetes": "Diabetes is a chronic condition that affects how your body turns food into energy. There are different types of diabetes, with Type 1 and Type 2 being the most common.",
//     "default": "I'm here to help you with health-related questions. Could you please be more specific?"
//   };

//   return {
//     answer: responses[question.toLowerCase()] || responses.default
//   };
// };



export const getChatResponse = async (question) => {
  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    return data; // Should return { answer: "response string" }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
