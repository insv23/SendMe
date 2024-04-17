FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN apt-get update && apt-get install -y sqlite3
COPY . .
EXPOSE 9003
CMD ["npm", "start"]