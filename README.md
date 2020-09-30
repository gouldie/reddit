# reddit-clone

## About <a name = "about"></a>

A reddit clone, deployed to https://reddit.hostman.site/

- Vue.js, Node.js, Express, MongoDB
- JWT for Auth

## Installing <a name = "installing"></a>

Development

```
npm install
npm run serve (client)
npm run server-dev (server)
default port 3000
```

Production

```
npm install
npm run build
npm run server
default port 8080
```

## Environment variables (.env) <a name = "env"></a>

```
MONGODB_URL=*MongoDB connection string*
SECRET=JWT secret key
CYPRESS_username=cypress auth testing username
CYPRESS_password=cypress auth testing password
```