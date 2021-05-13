FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.19-alpine

COPY --from=build /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000 80

ENTRYPOINT ["nginx","-g","daemon off;"]
