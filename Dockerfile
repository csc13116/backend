FROM node:latest

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
