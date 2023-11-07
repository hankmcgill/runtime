FROM node:18
WORKDIR /runtime
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server/server.js"]