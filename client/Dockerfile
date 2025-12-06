FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


EXPOSE 4200
