 FROM node:12.13
 WORKDIR /usr/src/app
 COPY ./release.tgz ./
 RUN tar -xvf release.tgz
 RUN npm install --production
 RUN npm i egg-scripts --save
 EXPOSE 7001
