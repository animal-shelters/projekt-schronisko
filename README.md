[![.github/workflows/docker-image.yml](https://github.com/animal-shelters/projekt-schronisko/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/animal-shelters/projekt-schronisko/actions/workflows/docker-image.yml)
# BACKEND
```BASH
cd /.backend/
```
## To run api platform server:
```PHP
symfony serve
```
## To run migrations
```PHP
symfony console doctrine:migrations:migrate
```
## env config
```BASH
cp .env .env.local
```
In env.local add line
```PHP
DATABASE_URL="mysql://!DBname!:!Password!@127.0.0.1:3306/app?serverVersion=8&charset=utf8mb4"
```

