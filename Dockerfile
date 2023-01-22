FROM node:alpine

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN mkdir dist/services/stock-data

CMD ["npm", "start"]
