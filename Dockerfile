FROM node:latest

WORKDIR /ec_shop_backend

COPY package*.json ./
COPY . . 
RUN npm install


EXPOSE 3000