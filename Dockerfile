FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set the entrypoint
ENTRYPOINT ["npm", "run", "test"]