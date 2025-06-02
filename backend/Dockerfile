FROM node:18
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies and generate package-lock.json
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
