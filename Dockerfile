FROM node:18.12.1

WORKDIR /usr/src/app

COPY swagger.yaml src/package.json src/package-lock.json ./

RUN npm install

RUN npm install -g nodemon

COPY src/ .

CMD ["npm", "run", "start"]
