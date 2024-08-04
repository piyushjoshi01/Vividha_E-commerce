# Stage 1: Build the application using a Node.js base image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Stage 2: Setup the production environment
FROM node:16-alpine
WORKDIR /app

# Copy only the built assets and production node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD ["node", "dist/index.js"]
