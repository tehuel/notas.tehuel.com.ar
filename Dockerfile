FROM node:24-alpine

ARG GITHUB_SHA=unknown
ENV GITHUB_SHA=${GITHUB_SHA}

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
