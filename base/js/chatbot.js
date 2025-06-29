const BACKEND_URL = "https://totot-restaurant.onrender.com";

// --- DOM Elements ---
const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const chatDisplay = document.getElementById("chatDisplay");
const quickQuestionButtons = document.querySelectorAll("button"); 

// ---  Add a message bubble ---
function addMessageToChat(message, isUser = true) {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-4 ${isUser ? 'text-right' : 'text-left'}`;

    const messageBubble = document.createElement('div');
    messageBubble.className = `inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
        ? 'bg-blue-500 text-white rounded-br-none'
        : 'bg-white text-gray-800 rounded-bl-none shadow-md'
        }`;

    messageBubble.textContent = message;
    messageDiv.appendChild(messageBubble);
    chatDisplay.appendChild(messageDiv);

    // Scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// --- Function to show typing indicator ---
function showTypingIndicator() {
    const chatDisplay = document.getElementById('chatDisplay');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'mb-4 text-left';

    const typingBubble = document.createElement('div');
    typingBubble.className = 'inline-block px-4 py-2 bg-gray-200 text-gray-600 rounded-lg rounded-bl-none';
    typingBubble.innerHTML = '<span class="typing-dots">Bot is typing<span>.</span><span>.</span><span>.</span></span>';

    typingDiv.appendChild(typingBubble);
    chatDisplay.appendChild(typingDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// --- Function to remove typing indicator ---
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// --- Main Chat Function ---
async function sendMessage(message = chatInput.value.trim()) {
    if (!message) return;

    addMessageToChat(message, true); // Add user message
    chatInput.value = ""; // Clear input immediately
    showTypingIndicator(); // Show typing indicator

    try {
        const response = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: message }),
        });

        removeTypingIndicator(); // Remove typing indicator once response is received

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Unknown server error' }));
            throw new Error(`HTTP error! status: ${response.status}, Detail: ${errorData.detail || 'No detail provided'}`);
        }

        const data = await response.json();
        console.log('Backend response:', data);

        const botResponse = data.answer || "Hmm, no response. Try again?"; 
        addMessageToChat(botResponse, false); // Add bot response

    } catch (error) {
        console.error("Error sending message:", error);
        removeTypingIndicator(); 
        addMessageToChat("Sorry, I'm having trouble connecting to the server. Please try again later.", false);
    }
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
    // Clear chat display on load if desired (useful for development)
    if (chatDisplay) {
        chatDisplay.innerHTML = "";
    }

    // Send message on button click
    if (sendMessageButton) {
        sendMessageButton.addEventListener("click", () => sendMessage());
    }

    // Send message on Enter key press in input field
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission if any
                sendMessage();
            }
        });
    }

    // Handle quick question buttons
    quickQuestionButtons.forEach((button) => {
        if (button.id !== 'sendMessageButton') {
            button.addEventListener("click", () => {
                const question = button.textContent.trim();
                if (question) {
                    sendMessage(question);
                }
            });
        }
    });

    // Initial welcome message
    addMessageToChat("👋 Welcome to Totot! Ask me anything about our dishes or services.", false); // Changed to bot message style

    const style = document.createElement('style');
    style.textContent = `
        .typing-dots span {
            animation: typing 1.4s infinite;
        }
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typing {
            0%, 60%, 100% {
                opacity: 0;
            }
            30% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});