import expressMysqlSession from "express-mysql-session";
import dotenv from 'dotenv'

dotenv.config()
function mysqlSessionStore(session) {
  const MySQLStore = expressMysqlSession(session);
  const store = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 1000 * 3600,
    expiration: 1000 * 3600 * 24 * 3,
  });

  return store;
}

export default mysqlSessionStore;
