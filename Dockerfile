FROM node:18-slim

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]
