FROM node:18.11.0-bullseye as base
ENV PATH=/app/node_modules/.bin:$PATH
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force

FROM base as test
ENV NODE_ENV test
RUN npm i --only=development \
    && npm cache clean --force
COPY . .
RUN npm audit
CMD ["npm" , "run" ,"test"]


FROM base as pro
ENV NODE_ENV production
COPY . .
COPY ./docker/docker-entrypoint-pro.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint-pro.sh" ]
CMD ["node","./dist/src/main.js"]

