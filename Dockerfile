FROM node:22

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "./src/index.js" ]