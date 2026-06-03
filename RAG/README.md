
# Resume RAG System

This project implements a Retrieval Augmented Generation (RAG) system designed to answer questions based on the content of a PDF resume. It leverages PDF text extraction, intelligent text chunking, sentence embeddings for semantic search, and the Google Gemini API for generating coherent answers.

## Features

*   **PDF Text Extraction**: Extracts all text content from a given PDF resume.
*   **Smart Text Chunking**: Breaks down the extracted text into manageable chunks with overlap to maintain context.
*   **Sentence Embeddings**: Converts text chunks into numerical vectors (embeddings) using a pre-trained sentence transformer model (`all-MiniLM-L6-v2`).
*   **ChromaDB Integration**: Stores and manages the text embeddings in a local ChromaDB collection for efficient retrieval.
*   **Contextual Retrieval**: Retrieves the most relevant text chunks from the resume based on a user's query.
*   **Gemini API Integration**: Uses the Google Gemini 2.5 Flash model to generate answers, ensuring responses are grounded solely in the provided resume context.
*   **CPU Safe**: Configured to run the embedding model on CPU, making it suitable for environments without GPU access (like standard Colab).

## Setup

### Prerequisites

*   Python 3.x
*   Google Colaboratory (recommended for ease of setup)
*   A Google Gemini API key.

### Installation

Run the following commands in your notebook to install the necessary libraries:

```python
!pip install pdfplumber
!pip install chromadb
!pip install sentence_transformers
!pip install google-generativeai
```

### API Key Configuration

1.  **Obtain a Gemini API Key**: If you don't have one, create a key from [Google AI Studio](https://aistudio.google.com/).
2.  **Colab Secrets**: In your Google Colab notebook, use the "🔑" icon in the left panel to open the Secrets manager. Add your API key there and name it `GEMINI_API_KEY`.

### Resume File

Place your resume PDF file in the `/content/` directory of your Colab environment or update the `pdf_path` variable in the `main` execution block to the correct path:

```python
pdf_path = "/content/S Santhosh Kumar Resume.pdf"  # Update this path if your resume is elsewhere
```

## How to Use

1.  **Run the Notebook**: Execute all cells in the notebook sequentially.
2.  **System Initialization**: The system will perform the following steps:
    *   Extract text from the specified PDF.
    *   Chunk the extracted text.
    *   Generate embeddings for each chunk and store them in ChromaDB.
3.  **Ask Questions**: Once "✅ RAG System Ready!" is displayed, you will be prompted to ask questions about the resume.
4.  **Get Answers**: The system will retrieve relevant information from the resume and generate an answer using the Gemini API.
5.  **Exit**: Type `exit` when prompted to stop the interaction.

**Example Interaction:**

```
Ask about the resume: What is the resume's about?

💬 Answer:

Not mentioned in the resume.

-----------------------------------------

Ask about the resume: List the skills

💬 Answer:

Languages: C | C++ | Python | Java | JavaScript
Web Technologies: HTML | CSS | React.js | Tailwind CSS | Node.js | E

-----------------------------------------

Ask about the resume: Is there Java certification

💬 Answer:
Not mentioned in the resume.
```

## Code Structure Highlights

*   **`extract_text_from_pdf`**: Handles parsing the PDF.
*   **`chunk_text`**: Implements basic text splitting with overlap.
*   **`embedding_model`**: Loads the `all-MiniLM-L6-v2` model for generating embeddings.
*   **`chroma_client` / `collection`**: Manages the vector database.
*   **`store_chunks`**: Populates ChromaDB with embeddings.
*   **`retrieve_context`**: Performs semantic search to find relevant document chunks.
*   **`answer_question`**: Constructs the prompt for Gemini and retrieves the generated answer.
*   **`main` block**: Orchestrates the entire process and handles user interaction.

