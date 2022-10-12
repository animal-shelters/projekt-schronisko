#syntax=docker/dockerfile:1.4

FROM node:18-alpine3.15 as dev
EXPOSE 3000
ENV PORT 3000
WORKDIR /srv/app
ENV PATH /srv/app/node_modules/.bin:$PATH
COPY --link ./package.json /srv/app
RUN npm i
COPY --link . /srv/app
CMD ["npm", "start"]

FROM node:18-alpine3.15 as build
WORKDIR /srv/app
ENV PATH /srv/app/node_modules/.bin:$PATH
COPY ./package.json /srv/app
RUN npm i --force
COPY --link . /srv/app
RUN npm run build


FROM nginx:1.17.8-alpine as prod
EXPOSE 80
ENV PORT 80
COPY --from=build --link /srv/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]

