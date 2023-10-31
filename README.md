# warehouse-management

This project consists of warehouse management UI and API.

UI ie on nextjs and graphql
API is on nestjs, postgress and graphql


Start the database
```
cd warehouse-monitor/warehouse-monitor-api
docker compose up
```

Run migration and start api
```
cd warehouse-monitor/warehouse-monitor-api
migration:run
cli:seeds
yarn start
http://localhost:3001/graphql
```

UI:
```
cd warehouse-monitor/warehouse-monitor-ui
yarn dev or yarn start
http://localhost:3000/
```
