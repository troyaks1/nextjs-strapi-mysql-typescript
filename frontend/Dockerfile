# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# or if you're using yarn
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# or if you're using yarn
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build
# or if you're using yarn
# RUN yarn build

# Expose the port on which your app will run
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=${NODE_ENV}

# Start the Next.js application
CMD ["npm", "start"]
# or if you're using yarn
# CMD ["yarn", "start"]
