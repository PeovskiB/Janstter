# Use an official Node.js image as a parent image
FROM node:18.16.0-alpine3.18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or the port your app is running on)
EXPOSE 3000
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]
