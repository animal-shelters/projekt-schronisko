#syntax=docker/dockerfile:1.4

FROM node:18-alpine3.15 as dev
EXPOSE 3000
ENV PORT 3000
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY --link ./package.json /app/
RUN npm i
COPY --link . /app
CMD ["npm", "start"]

FROM node:18-alpine3.15 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN npm i
COPY --link . /app
RUN npm run build


FROM nginx:1.17.8-alpine as prod
EXPOSE 80
ENV PORT 80
COPY --from=build --link /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]

