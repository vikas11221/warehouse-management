// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

const isTsNodeEnvironment = !!process[Symbol.for('ts-node.register.instance')];

// This is used to check if its running in ts-node mode or not.
const baseDbSourceDir =
  isTsNodeEnvironment || process.env.NODE_ENV === 'test' ? 'src' : 'dist';

const modelsDir = join(__dirname, baseDbSourceDir, 'api');
const databaseModule = join(__dirname, baseDbSourceDir, 'database');
const migrationsDir = join(databaseModule, 'migrations');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  entities: [join(modelsDir, '**/*.model{.ts,.js}')],
  subscribers: [],
  migrationsTableName: 'migrations',
  migrations: [join(migrationsDir, '*{.ts,.js}')],
  cli: {
    entitiesDir: join(modelsDir),
    migrationsDir: join('src', 'database', 'migrations'),
    subscribersDir: join('src', 'database', 'subscribers'),
  },
  migrationsRun: process.env.DB_RUN_MIGRATIONS
    ? JSON.parse(process.env.DB_RUN_MIGRATIONS) === true
    : false,
  synchronize: false,
  keepConnectionAlive: true,
};
