# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the NestJS app
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the NestJS app
CMD ["npm", "run", "start:prod"]

# FROM node:18

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# RUN npx prisma generate

# EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
