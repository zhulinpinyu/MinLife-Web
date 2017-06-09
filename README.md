# MinLife-Web

Light Web Application, record life bill.

## Dev Setup

### Server

```shell
cd server
json-server db.json --routes routes.json
```

### Web

```shell
cd web
yarn install
yarn start
```

## Deploy use Docker

### Build Image

```shell
docker build -t minlife-web .
```

### Run Production

```shell
docker run --name mw -v `PWD`/data:/app/data -p 80:3000 minlife-web
```

Tips: `data` folder contain `db.json`.

**DO NOT USE** following (`db.json` **WILL NOT SYNC** to local from docker container)

```
-v `PWD`/data/db.json:/app/data/db.json`
```
