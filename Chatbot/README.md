# Gemini Chatbot (Python)

A simple Python console chatbot that sends messages to Google Gemini using a Gemini API key.

## Setup

1. Create and activate a Python virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Set your Gemini API key:

```powershell
$env:GEMINI_API_KEY = 'your_gemini_api_key_here'
```

> Note: This script uses the official `google-genai` Python client and requires a Gemini API key from Google AI Studio.

## Run

```powershell
python chatbot.py
```

Then type messages and press Enter. Use `exit` or `quit` to stop.
