FROM node:18.12.1

WORKDIR /app

COPY src/package.json src/package-lock.json ./

RUN npm install

RUN npm install -g nodemon

CMD ["npm", "run", "start"]