// Add this code to the existing script.js file

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
}

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage("You", userMessage);
    userInput.value = "";

    const apiKey = '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'; // Replace with your OpenAI API key
    const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        const chatResponse = data.choices[0].text.trim();
        appendMessage('ChatGPT', chatResponse);
    })
    .catch(error => console.error('Error:', error));
}
