FROM docker.io/node:latest

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

EXPOSE 5173

# Set Vite host to 127.0.0.1
ENV VITE_HOST=127.0.0.1

# Start the app in development mode with host flag
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# docker build -t ski-slopes-frontend -f docker/frontend/Dockerfile ./ski_slopes 