# Build with:
# docker build -t theerayut99/express-template .

# Run with:
# docker run -p 3000:3000 -it --name ecs-express-template theerayut99/express-template

# Remove:
# docker stop ecs-express-template && docker rm ecs-express-template && docker rmi theerayut99/express-template && docker images && docker ps -a

# Initial image from node:alpine
FROM --platform=linux/amd64 node:12.20.1-alpine

LABEL maintainer "Theerayut Thanyaphoo"

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

ENV TZ=Asia/Bangkok

RUN npm install --quiet && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Bundle app source
COPY . /usr/src/app

# Expose port 3000
EXPOSE 3000

# Start app
CMD [ "npm", "run", "docker:run" ]
