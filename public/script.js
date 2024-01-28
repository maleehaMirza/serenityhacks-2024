// Update the API endpoint to the local server
const API_ENDPOINT = 'http://localhost:3000/api/chatgpt';

const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage("You", userMessage);
    userInput.value = "";

    const apiKey = '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';

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 100
        })
    });

    const data = await response.json();
    const chatResponse = data.response.trim(); // The server now sends { response: chatResponse }
    appendMessage('ChatGPT', chatResponse);
}

async function generateTasks() {
    const emotion = userInput.value.trim();
    if (emotion === "") return;

    const tasks = await getTasksFromChatGPT(emotion);

    // Display the generated tasks in the chat
    tasks.forEach(task => appendMessage('ChatGPT', task));
}

async function getTasksFromChatGPT(emotion) {
    try {
        const response = await fetch(API_ENDPOINT, { // Use the same API endpoint for tasks
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: `Generate 10 tasks for handling ${emotion}`,
                max_tokens: 100
            })
        });

        const data = await response.json();
        const generatedTasks = data.response.map(choice => choice.trim()); // The server now sends { response: [...tasks] }

        return generatedTasks;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
