FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN rm -rf node_modules && npm install
EXPOSE 9003
CMD ["node", "index.js"]