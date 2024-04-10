
## Description

Tundrax development assignment.

## Before

- Based on your system make sure you have Postgres installed locally and the system is up.
- Make sure you have all the connection details for a the database ready
- Add the database connection details in the `.env` file

## Installation

```bash
$ npm install
```

## Running the migrations

```bash
$ npm run migration:run
```

## Running the API

```bash
# development
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technology

This project is a continuation of https://github.com/Tundrax-Dex/nestjs-assignment, built with NestJS, authentification with Passport.js and JWT, TypeORM for mapping tables to model classes and PostgreSQL for data persistence. 

## Testing the API

- In the project root you'll find `Tundrax.postman_collection.json`. Install the Postman app and import this collection.

**Following routes don't require authentication:**

```bash

[POST] /auth/register : Creates a new user
{
    "username": "johndoe",
    "password": "tryme"
}
// Username "andrei" will automatically get the "admin" role.

[POST] /auth/login : Authenticate user and returns JWT token
{
    "username": "johndoe",
    "password": "tryme"
}

```

**Following routes do require authentication:**

```bash

[GET] /cats : list all cats
[GET] /cats/:id : retrieve a cat profile

# only admin role, test this with "andrei" username profile
[POST] /cats : Creates a new cat profile
{
    "name": "Lessy",
    "age": 2,
    "breed": "Bulldog"
}

[PUT] /cats/:id : Updates cat profile
{
    "name": "Dexter",
    "age": 3,
    "breed": "French Bulldog"
}

[DELETE] /cats/:id : Deteles a cat profile
```

