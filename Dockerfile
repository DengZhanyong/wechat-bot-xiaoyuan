FROM ubuntu:18.04
FROM node:18
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y libc6

WORKDIR /app

COPY . /app
RUN npx puppeteer browsers install chrome
# RUN apt-get update && apt-get install -y libc6
RUN npm install


# COPY . .

# EXPOSE 3000
CMD [ "node", "./bot/index.js" ]