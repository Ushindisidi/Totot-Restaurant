import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the Gemini API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY environment variable not set. Please check your .env file in the project root.")
else:
    try:
        # Configure the Gemini API with key in .env
        genai.configure(api_key=GEMINI_API_KEY)

        MODEL_TO_USE = 'gemini-1.5-flash'
        print(f"Attempting to use model: {MODEL_TO_USE}")

        # testing
        print(f"\nMaking a test generation request with {MODEL_TO_USE}...")
        test_model = genai.GenerativeModel(MODEL_TO_USE)
        response = test_model.generate_content("Hello Gemini, briefly introduce yourself. Respond in one concise sentence.")
        print("Gemini's response:")
        print(response.text)
        print("\nTest generation successful!")

    except Exception as e:
        print(f"ERROR: Could not connect to Gemini API or generate content. Details: {e}")
        print("This could be due to an invalid/restricted API key, network issues, or a temporary API problem.")
        print("Double-check your API key in Google AI Studio and ensure it's copied correctly into your .env file.")
        print("Also verify the model name is correct and available in your region.")