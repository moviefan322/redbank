FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

ENV MONGODB_USERNAME=phil
ENV MONGODB_PASSWORD=secret

CMD ["npm", "run", "server"]
