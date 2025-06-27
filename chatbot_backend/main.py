from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import asyncio # Required for async operations

# Import the restaurant information
from restaurant_info import RESTAURANT_INFO

# --- Initial setup ---
# Load environment variables from .env file 
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    # Raise an error and stop startup if the key is missing
    raise ValueError("GEMINI_API_KEY environment variable not set. Please check your .env file in chatbot_backend/.")

# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)
# Using 'gemini-1.5-flash' for potentially faster responses.
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="Totot Traditional Restaurant Chatbot API")

# --- Pydantic Models for Chat ---
# Defines the structure of the incoming request body
class ChatRequest(BaseModel):
    question: str

# Defines the structure of the outgoing response body
class ChatResponse(BaseModel):
    answer: str

# --- Chat Endpoint ---
@app.post("/chat", response_model=ChatResponse, summary="Get an answer from the Totot chatbot")
async def chat_with_bot(request: ChatRequest):
    # Error Handling: Checking for empty or whitespace-only input
    if not request.question or not request.question.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question cannot be empty. Please ask something about Totot Traditional Restaurant!"
        )

    # prompt for Gemini AI
    full_prompt = f"""
    You are a helpful and friendly AI assistant representing Totot Traditional Restaurant.
    Your goal is to answer user questions politely and accurately based ONLY on the provided restaurant information.
    Maintain a warm, hospitable, and knowledgeable brand voice, reflecting Ethiopian tradition and cultural heritage.
    If a question cannot be answered with the given information, politely state that you do not have that specific information.
    Do NOT invent information or stray from the provided context.

    --- Restaurant Information ---
    {RESTAURANT_INFO}
    --- End Restaurant Information ---

    User Question: "{request.question.strip()}"

    Your Answer:
    """

    try:
        # asynchronous call to Gemini API
        response = await model.generate_content_async(full_prompt)
        chatbot_answer = response.text
        return ChatResponse(answer=chatbot_answer)
    except Exception as e:
        # debugging
        print(f"Error during AI generation: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Sorry, I'm having trouble providing an answer right now. Please try again later."
        )

# --- Basic root endpoint for health check ---
@app.get("/", summary="Health check endpoint")
async def read_root():
    return {"message": "Totot Traditional Restaurant Chatbot API is running. Visit /docs for API documentation."}

