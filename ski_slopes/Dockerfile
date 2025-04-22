FROM docker.io/node:latest

WORKDIR /app

# Copy files first
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5173

# Start development server with host and watch options
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# docker build -t ski-slopes-frontend -f docker/frontend/Dockerfile ./ski_slopes 