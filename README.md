# ShopSmart

A simple e-commerce product search application with React frontend and Express backend.

## Architecture

```
┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │
│   (React)   │◀────│  (Express)  │
└─────────────┘     └─────────────┘
      │                    │
      ▼                    ▼
   Vercel              Render/EC2
```

- **Frontend**: React + Vite (port 5173 dev)
- **Backend**: Express.js API (port 5001)
- **API Endpoints**:
  - `GET /` - Welcome message
  - `GET /api/health` - Health check
  - `GET /api/products/search?q=` - Search products

## Commands

### Frontend (client/)
```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Unit tests (vitest)
npm run test:e2e # E2E tests (playwright)
npm run lint     # Lint code
```

### Backend (server/)
```bash
npm install      # Install dependencies
npm start        # Start server
npm run dev      # Start with hot reload
npm test         # Unit + Integration tests
```

## Testing

### Unit Tests
- **Frontend**: Vitest - Tests React components in isolation
- **Backend**: Jest - Tests API endpoints

### Integration Tests
- **Backend**: Jest - Tests multiple endpoints working together

### E2E Tests
- **Frontend**: Playwright - Tests in real browser
- Simulates user actions (search, click, view)

### Test Files
| Type | Location |
|------|----------|
| Frontend Unit | `client/src/App.test.jsx` |
| Frontend E2E | `client/e2e/app.spec.js` |
| Backend Unit | `server/tests/app.test.js` |
| Backend Integration | `server/tests/integration.test.js` |

## CI/CD Pipeline

GitHub Actions runs automatically on push/PR:
1. **Lint** - Super Linter checks code style
2. **Test Backend** - Runs Jest tests
3. **Test Frontend** - Runs Vitest tests
4. **E2E Tests** - Runs Playwright in browser
5. **Deploy** - Pushes to EC2 on main branch

## Deployment

- **Frontend**: Vercel
- **Backend**: Render or AWS EC2

## Requirements

1. SQLite3 for database storage
2. Prisma ORM
3. Full CRUD RESTful API
4. Deploy on Render (backend) + Vercel (frontend)
5. CORS configured
