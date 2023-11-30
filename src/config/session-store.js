import expressMysqlSession from "express-mysql-session";

function mysqlSessionStore(session) {
  const MySQLStore = expressMysqlSession(session);
  const store = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "wm050604",
    database: "news",
    clearExpired: true,
    checkExpirationInterval: 1000 * 3600,
    expiration: 1000 * 3600 * 24 * 3,
  });

  return store;
}

export default mysqlSessionStore;
