FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
