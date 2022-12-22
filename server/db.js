const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "cpadmin",
    host: "localhost",
    database: "pern-todo-list",
    port: 5432
});

module.exports = pool; // For use in other files