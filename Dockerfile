FROM node:lts-alpine3.19

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build application
RUN npm run build

# Run postgraphile
RUN npm run postgraphile

# Start the application
CMD ["npm", "start"]
