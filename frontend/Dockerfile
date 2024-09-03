# Use an official Node.js runtime as the base image
FROM node:18-alpine

RUN mkdir -p /app

# Set the working directory inside the container
WORKDIR /app

# Set environment variable to production
ENV NODE_ENV=production

# Copy the application files to the container
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js app
RUN npm run build

# Expose the application on port 3000
EXPOSE 3000

# Start the Next.js server
ENTRYPOINT ["npm", "run", "start"]