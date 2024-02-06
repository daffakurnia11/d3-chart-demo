# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json ./ 
COPY yarn.lock ./

# Copy the current directory contents into the container at /app
COPY . .

# Install any dependencies
RUN yarn install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "dev"]
