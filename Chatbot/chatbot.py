import os
import sys

from google import genai

MODEL = os.getenv('GEMINI_MODEL', 'gemini-3.5-flash')


def get_api_key():
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise EnvironmentError('GEMINI_API_KEY environment variable is not set.')
    return api_key


def create_client(api_key: str):
    return genai.Client(api_key=api_key)


def send_message(client, user_message: str) -> str:
    response = client.models.generate_content(
        model=MODEL,
        contents=user_message,
    )
    return response.text


def run_chat_loop():
    api_key = get_api_key()
    client = create_client(api_key)

    print('Gemini Chatbot (Python)')
    print('Type a message and press Enter. Use "exit" or "quit" to stop.')

    while True:
        try:
            message = input('\nYou: ').strip()
        except (KeyboardInterrupt, EOFError):
            print('\nGoodbye!')
            return

        if not message:
            continue
        if message.lower() in {'exit', 'quit'}:
            print('Goodbye!')
            return

        try:
            reply = send_message(client, message)
            print('\nGemini:', reply)
        except Exception as exc:
            print(f'Error: {exc}')


if __name__ == '__main__':
    try:
        run_chat_loop()
    except EnvironmentError as exc:
        print(f'Configuration error: {exc}', file=sys.stderr)
        sys.exit(1)
    except Exception as exc:
        print(f'Unexpected error: {exc}', file=sys.stderr)
        sys.exit(1)
