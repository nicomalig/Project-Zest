# build environment
FROM node as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # base image
# FROM node

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /usr/src/app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@1.1.1 -g --silent

# # start app
# CMD ["npm", "start"]

# FROM node
# WORKDIR /app
# COPY . .
# RUN npm run build

# FROM node
# RUN npm install serve
# WORKDIR /app
# CMD [“serve”, “-p 80”, “-s”, “.”]


# FROM node:7.8.0
# ENV NPM_CONFIG_LOGLEVEL warn
# COPY . .
# RUN npm run build --production
# RUN npm install -g serve
# CMD serve -s build
# EXPOSE 5000


# FROM node

# RUN npm install -g serve
# CMD serve -s build
# EXPOSE 5000

# COPY package.json package.json
# COPY npm-shrinkwrap.json npm-shrinkwrap.json
# RUN npm install

# COPY . .

# RUN npm run build --production





# WORKDIR /usr/src/app

# COPY package.json package-lock.json ./
# RUN npm install -g serve
# RUN npm install
# COPY . .
# EXPOSE 5000
# # ENTRYPOINT [ "node", "index.js" ]
# RUN npm run build --production
