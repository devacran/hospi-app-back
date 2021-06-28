# pull official base image
FROM node:lts-alpine3.10

# set working directory
WORKDIR /back

# install app dependencies
COPY package.json ./
#RUN npm install 
RUN npm i
# add app
COPY . ./

# start app
CMD ["npm", "start"]


