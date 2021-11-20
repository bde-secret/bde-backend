# bde-backend

Hello and welcome to the backend of the project bde-secret

## How to install

You first need to install the dependencie,
To do so you can use
```
npm run yarn
npm run generate-config
```

The database use docker to start it you can use
```
docker compose up -d db
```

To connect to the database :
```
User: bde
Password: password
Port: 5432
Db: bde
```

## How to run the server

```
npm run serve
```

## Testing

```
npm run test
```

You need at least 90% coverage to be able to push your code to the repository