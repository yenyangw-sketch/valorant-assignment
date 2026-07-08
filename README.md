# Valorant Assignment

A full-stack application with Express.js backend and Next.js frontend.

## Project Structure

```
valorant-assignment/
├── backend/          # Express.js API server
└── frontend/         # Next.js React application
```

## Backend Setup (Express.js)

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Development

Run the development server with hot reload:
```bash
npm run dev
```

The backend will start on `http://localhost:3001`

### Production Build

```bash
npm run build
npm start
```

### Available Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/agents` - List of Valorant agents

## Frontend Setup (Next.js)

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

The default API URL is `http://localhost:3001/api`. Update if needed.

### Development

Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Getting Started

1. **Start the backend first:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **In a new terminal, start the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open your browser:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001/api`

## Technologies Used

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **ts-node** - Run TypeScript directly
- **Nodemon** - Auto-reload during development
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS** - Styling

## Scripts

### Backend
- `npm run dev` - Start development server
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- The backend uses port 3001 by default
- The frontend uses port 3000 (Next.js default)
- Make sure both ports are available or update the PORT variable in backend `.env`
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local` if backend runs on a different port

