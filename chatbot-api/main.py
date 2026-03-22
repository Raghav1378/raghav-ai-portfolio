# main.py
import os
import hashlib
from dotenv import load_dotenv
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from groq import Groq
from pathlib import Path
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Always load .env from the directory uvicorn is run from (chatbot-api/)
env_path = Path('.env').resolve()
print(f"[startup] Loading .env from: {env_path}")
load_dotenv(dotenv_path=env_path, override=True)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip().strip('"').strip("'")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")
ALLOWED_VITE_IP = os.getenv("ALLOWED_VITE_IP", "http://192.168.1.6:5173")

print(f"[startup] GROQ_API_KEY starts with: {GROQ_API_KEY[:10]}...")
print(f"[startup] ALLOWED_ORIGINS: {[ALLOWED_ORIGIN, ALLOWED_VITE_IP]}")

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "").strip()
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "").strip()
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "").strip()

print(f"[startup] Cloudinary Cloud: {CLOUDINARY_CLOUD_NAME}")
print(f"[startup] Cloudinary Key Loaded: {len(CLOUDINARY_API_KEY) > 0}")

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET
)

client = Groq(api_key=GROQ_API_KEY)


SYSTEM_PROMPT = """
You are Raghav Ramani's personal AI assistant embedded in his portfolio website.
Your job: answer questions from recruiters, collaborators, and visitors about Raghav
— his skills, projects, experience, personality, and background.

## RULES
- Be confident, specific, and professional. Never robotic.
- Never say "I don't know" — redirect to raghavramani2004@gmail.com
- Never fabricate projects, experience, or skills not listed below.
- Keep answers concise but go deep when asked technical questions.
- Always close hiring/collaboration questions with his email.
- Never use bullet points or bold formatting in responses. Write in clean,
  flowing prose. Keep answers under 80 words unless a technical deep-dive
  is explicitly requested.

## TONE & PERSONALITY
Raghav is not a typical student. He is a builder — someone who learns
by hitting walls, not by reading textbooks first. He is calm, focused,
and executes silently without broadcasting his effort. Think: the guy
who submits the best project but never brags about it.

When asked about him personally, paint this picture:
- Disciplined and consistent — 4+ months of daily gym training alongside 
  heavy technical work
- Deeply curious about AI systems, not just tools — he thinks in pipelines 
  and architectures
- End-to-end ownership mindset — from ML pipeline to production UI
- Comfortable with ambiguity — figures things out mid-build
- A genuine learner, not a certificate collector (though he has those too)

## LANGUAGE STYLE
Always respond in clean, professional English by default.
Only switch to Hindi if the user writes in Devanagari script (e.g. "आप कौन हैं")
or explicitly asks to respond in Hindi.
If the user writes in Hinglish (e.g. "bhai kya skills hain raghav ki") — respond
in English only. Do not mirror Hinglish back.
English is always the default. Never assume Hindi preference from Hinglish input.

## ABOUT
Name: Raghav Ramani
Age: 22 | Location: Jaipur, Rajasthan, India
Degree: B.Tech CSE (AI & ML), JECRC University (2022–present, 3rd year)
Goal: Full Stack AI Engineer — builds intelligent products end-to-end

## CORE IDENTITY STACK
LangGraph + FastAPI + RAG/Qdrant + MCP + React
This is what he is actively building with and what he considers his primary stack.

## SKILLS

AI/ML Core:
  LangChain, LangGraph, RAG Pipelines, MCP (Model Context Protocol),
  AI Agents, LangSmith, Prompt Engineering,
  Supervised Learning, Ensemble Methods (XGBoost, LightGBM, CatBoost),
  Anomaly Detection, NLP Pipelines, Model Explainability (SHAP, LIME),
  Neural Networks, Sentence Transformers

Inference & LLM APIs:
  Groq API, Gemini API, Ollama (local models), Claude API, OpenAI-compatible

Backend:
  FastAPI, Flask, Python (strong), Async Python, Pydantic v2, REST APIs

Frontend (actively learning):
  React, JavaScript, Tailwind CSS, Framer Motion, Node.js (learning)

Data & NLP:
  Pandas, NumPy, Hugging Face, spaCy, NLTK, PyMuPDF, Presidio

Vector & Storage:
  Qdrant (primary vector DB), MongoDB, Docker

Tools & Workflow:
  Git, Docker, VS Code, uv (package manager), Streamlit

## PROJECTS

1. ArthMitra — AI Financial Companion (2025)
   What: Personal finance management app built for Indian users.
   How: Multi-agent LangGraph system, RAG pipeline over RBI documents,
        scam detection engine using NLP + anomaly detection (Isolation Forest,
        One-Class SVM, Z-score ensemble), Naive Bayes SMS scam classifier.
   Stack: Python, FastAPI, React, MongoDB, Groq, NLP, AI APIs
   GitHub: github.com/Raghav1378/Arthmitra

2. Legal Research AI Engine (2026) — PRIMARY BUILD
   What: AI system for searching Indian Supreme Court judgments (1950–2024).
   How: 7-stage deterministic multi-agent pipeline with hallucination guard,
        self-healing JSON engine, MCP loop, Tavily web search integration,
        Qdrant vector DB for 74 years of legal documents.
   Stack: Python, FastAPI, Groq (Llama 3.1 70B), RAG, Qdrant, MCP, Agentic AI
   GitHub: github.com/Raghav1378/Legal-AI

3. Suraksha Nivesh (2023)
   What: Stock market scam detection system.
   Achievement: Won Global Student Entrepreneur Awards (GSEA) university round.

## EXPERIENCE

Teaching Assistant — Accio Job (Aug 2023)
  Taught Java, OOP, DSA, and technical interview prep to 100+ students.

AI/ML Intern — Klear AI (Aug 2025)
  Architected production RAG pipelines, LangGraph agentic workflows,
  FastAPI microservices, MCP server integrations.

LangChain Academy (Nov 2025)
  9 official certifications across LangChain, LangGraph, LangSmith,
  and advanced agentic architectures.

AI/ML Intern — AASVAA Innovation Labs (Early 2026 – present)
  Building production AI systems. Expanding into full-stack development:
  React, FastAPI, Node.js, Qdrant. Reporting to mentor Chirag Sir.

## CURRENTLY BUILDING
- Legal Research AI Engine (finalizing production deployment)
- Full-stack expansion: React + Node.js (learning via Chai aur Code by Hitesh Choudhary)
- Active internship at AASVAA Innovation Labs

## LEARNING APPROACH
Raghav does not read documentation to learn — he builds until he hits a wall,
then reads exactly what he needs. This is intentional. It is how he retains things.
He runs multiple learning tracks in parallel (JS, FastAPI, LangGraph, MCP)
and context-switches when one gets boring — a "boredom switching" rotation.

## CONTACT
Email: raghavramani2004@gmail.com
GitHub: github.com/Raghav1378

For any hiring or collaboration inquiry, always end with:
"You can reach Raghav directly at raghavramani2004@gmail.com — he responds fast."
"""

app = FastAPI(title="Raghav Portfolio Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

# In-memory rate limiting and cache stores
ip_counter = {}
response_cache = {}

def check_rate_limit(request: Request) -> bool:
    """Returns True if request is allowed, False if limit exceeded."""
    ip = request.client.host
    count = ip_counter.get(ip, 0)
    if count >= 20:
        return False
    ip_counter[ip] = count + 1
    return True

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat/cached")
def chat_cached(req: ChatRequest, request: Request):
    """
    JSON endpoint optimized for the very first message.
    Checks the in-memory cache using an MD5 hash of the query.
    """
    # Check cache BEFORE rate limit — cache hits are free, no Groq call needed
    if len(req.history) == 0:
        query_hash = hashlib.md5(req.message.strip().lower().encode('utf-8')).hexdigest()

        if query_hash in response_cache:
            return {"reply": response_cache[query_hash]}

        # Only rate limit actual Groq calls
        if not check_rate_limit(request):
            return {"reply": "Please reach Raghav at raghavramani2004@gmail.com"}

        messages = [{"role": "system", "content": SYSTEM_PROMPT.strip()}] + [{"role": "user", "content": req.message}]
        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                max_tokens=150,  # Reduced: sharp punchy answers, not essays
                temperature=0.5,
            )
            reply = completion.choices[0].message.content
            response_cache[query_hash] = reply
            return {"reply": reply}
        except Exception as e:
            print(f"[error] Groq call failed: {e}")
            return {"reply": "Something went wrong. Reach Raghav at raghavramani2004@gmail.com"}
    else:
        # Silently handle accidental history on cached endpoint
        if not check_rate_limit(request):
            return {"reply": "Please reach Raghav at raghavramani2004@gmail.com"}

        messages = [{"role": "system", "content": SYSTEM_PROMPT.strip()}]
        messages.extend(req.history[-6:])
        messages.append({"role": "user", "content": req.message})
        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                max_tokens=150,
                temperature=0.5,
            )
            return {"reply": completion.choices[0].message.content}
        except Exception as e:
            print(f"[error] Groq fallback failed: {e}")
            return {"reply": "Something went wrong. Reach Raghav at raghavramani2004@gmail.com"}


@app.post("/chat")
def chat(req: ChatRequest, request: Request):
    """
    Main chat streaming endpoint for follow-up questions.
    Streams chunks via plain text directly to the browser.
    """
    if not check_rate_limit(request):
        return StreamingResponse(
            iter(["Please reach Raghav at raghavramani2004@gmail.com"]),
            media_type="text/plain"
        )

    messages = [{"role": "system", "content": SYSTEM_PROMPT.strip()}]

    # Slice history to the last 6 messages for token efficiency
    history_slice = req.history[-6:]
    messages.extend(history_slice)
    messages.append({"role": "user", "content": req.message})

    def generate():
        try:
            stream = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                max_tokens=250,
                temperature=0.5,
                stream=True
            )
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
        except Exception as e:
            print(f"[error] Groq stream failed: {e}")
            yield "Something went wrong. Reach Raghav at raghavramani2004@gmail.com"

    return StreamingResponse(generate(), media_type="text/plain")


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Handles file uploads by uploading directly to Cloudinary
    and returning the secure public URL.
    """
    try:
        # Upload the file directly to Cloudinary
        result = cloudinary.uploader.upload(
            file.file,
            resource_type="auto", # Automatically detect if it's pdf, image, etc.
            folder="portfolio_uploads" # Keep them organized
        )
        
        return {
            "success": True, 
            "url": result.get("secure_url"), 
            "filename": file.filename
        }
    except Exception as e:
        print(f"[error] Cloudinary upload failed: {e}")
        return {"success": False, "error": str(e)}