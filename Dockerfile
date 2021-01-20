FROM node:12.17.0-alpine
ADD . src/
WORKDIR /src
RUN npm install -g typescript
RUN npm install
RUN npm run build
CMD npm start