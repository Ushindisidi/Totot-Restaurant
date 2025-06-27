// --- Configuration ---
const BACKEND_URL = "https://totot-chatbot.onrender.com";

// --- DOM Elements ---
const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const chatDisplay = document.getElementById("chatDisplay");
const sampleButtons = document.querySelectorAll("section button"); 

// --- Helper: Add a message bubble ---
function addMessageToChat(sender, message) {
  const wrapper = document.createElement("div");
  const bubble = document.createElement("div");

  bubble.innerHTML = <p>${message}</p>;
  bubble.style.display = "inline-block";
  bubble.style.maxWidth = "70%";
  bubble.style.padding = "8px 12px";
  bubble.style.borderRadius = "15px";
  bubble.style.marginBottom = "10px";

  if (sender === "user") {
    wrapper.style.textAlign = "right";
    bubble.style.backgroundColor = "#007bff";
    bubble.style.color = "white";
  } else if (sender === "bot") {
    wrapper.style.textAlign = "left";
    bubble.style.backgroundColor = "#e2e2e2";
    bubble.style.color = "#333";
  } else {
    wrapper.style.textAlign = "center";
    bubble.style.fontSize = "0.9em";
    bubble.style.fontStyle = "italic";
    bubble.style.color = "#888";
  }

  wrapper.appendChild(bubble);
  chatDisplay.appendChild(wrapper);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// --- Main Chat Function ---
async function sendMessage(message = chatInput.value.trim()) {
  if (!message) return;

  addMessageToChat("user", message);
  chatInput.value = "";
  addMessageToChat("system", "Totobot is typing...");

  const typingMessage = chatDisplay.lastChild;

  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message }),
    });

    if (typingMessage) chatDisplay.removeChild(typingMessage);

    if (response.ok) {
      const data = await response.json();
      addMessageToChat("bot", data.answer || "Hmm, no response. Try again?");
    } else {
      const err = await response.json();
      addMessageToChat("bot", `Error: ${err.detail || "Server issue"}`);
    }
  } catch (error) {
    if (typingMessage) chatDisplay.removeChild(typingMessage);
    addMessageToChat("bot", "Connection error. Please try again later.");
    console.error("Fetch error:", error);
  }
}

//adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  if (chatDisplay) chatDisplay.innerHTML = "";

  sendMessageButton?.addEventListener("click", () => sendMessage());

  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  sampleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sendMessage(btn.textContent.trim());
    });
  });

  addMessageToChat("Totot Assistant", "👋 Welcome to Totot! Ask me anything about our dishes or services.");
});
