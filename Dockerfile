FROM node:18.12.1

WORKDIR /app

COPY swagger.yaml src/package.json src/package-lock.json ./

RUN npm install

COPY src/ .

CMD npm run start