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

## Deploy

### Build Image

```shell
docker build -t minlife-web .
```

### Run Production

```shell
docker run --name mw -v `PWD`/data:/app/data -p 80:3000 minlife-web
```

Tips: `data` folder contain file `db.json`.

**DO NOT** USE following, `db.json` **will NOT SYNC** to local from docker container

```
-v `PWD`/data/db.json:/app/data/db.json`
```
