# LoHaa — Learn Cantonese 🐉

A beginner Cantonese speaking assistant for web and mobile, built with Expo and powered by an AI tutor (OpenAI GPT-4o).

## Features
- 📚 6 beginner lesson modules (greetings, introductions, numbers, daily phrases, food, tone practice)
- 🎵 Text-to-speech pronunciation for every phrase (Cantonese TTS)
- 🎤 Microphone recording for speaking practice drills
- 🤖 AI Cantonese tutor chat powered by GPT-4o
- 📊 Progress tracking with streaks, local persistence via AsyncStorage
- 📱 Runs on iOS, Android, and Web (Expo)

## Quick Start

### Prerequisites
- Node.js 18+
- Expo Go app (iOS/Android) or a simulator

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm run dev
```

The backend runs on `http://localhost:3001`.

### 2. Frontend

```bash
cd frontend
# For development — set the backend URL:
# Create frontend/.env with: EXPO_PUBLIC_API_URL=http://localhost:3001
npm start
```

Then scan the QR code with Expo Go, or press `w` for web.

## Project Structure

```
lingeshaibuilds/
├── frontend/        # Expo app (iOS, Android, Web)
│   ├── app/         # Expo Router screens
│   ├── components/  # Shared UI components
│   ├── data/        # Lesson content
│   ├── store/       # Zustand state
│   ├── services/    # API client
│   └── hooks/       # Custom hooks
└── backend/         # Express API (OpenAI proxy)
    └── src/
        ├── routes/  # API routes
        └── services/# OpenAI wrapper
```

## Environment Variables

**backend/.env**
```
OPENAI_API_KEY=sk-...
PORT=3001
```

**frontend/.env**
```
EXPO_PUBLIC_API_URL=http://localhost:3001
```
