# Stage 1: Build frontend
FROM node AS build-frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend, incorporating frontend build
FROM node AS build-backend
WORKDIR /app
# Copy frontend build from the previous stage to the public directory
COPY --from=build-frontend /app/build /app/public
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
# Make sure your backend serves files from /app/public

EXPOSE 3001
CMD ["npm", "run", "server"]
