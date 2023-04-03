#Use an official Node.js image as the base image
FROM node:18.12

#Set the working directory
WORKDIR /app

#Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

#Install dependencies
RUN yarn install

#Copy the rest of the application code to the working directory
COPY . ./

#Building
RUN yarn build

#Specify the command to run when the container starts
CMD ["yarn", "start"]
