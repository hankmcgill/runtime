FROM node:18-alpine
WORKDIR /runtime
COPY . .
RUN npm install
CMD ["node", "server/server.js"]