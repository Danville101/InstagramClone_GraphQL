FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm install --force

RUN npm install bcrypt --legacy-peer-deps

COPY . .
COPY .env .




