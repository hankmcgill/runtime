FROM node:18-alpine
WORKDIR /runtime
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server/server.js"]