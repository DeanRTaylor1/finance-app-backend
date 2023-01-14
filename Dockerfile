FROM node:alpine

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]