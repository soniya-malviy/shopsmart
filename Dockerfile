# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:20-alpine AS backend-builder

WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production

# Stage 3: Production image
FROM node:20-alpine

WORKDIR /app

# Copy backend dependencies and code
COPY --from=backend-builder /app/node_modules ./node_modules
COPY server/ ./

# Copy built frontend into server/public
COPY --from=frontend-builder /app/client/dist ./public

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

USER appuser

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5001/api/health || exit 1

CMD ["node", "src/index.js"]
