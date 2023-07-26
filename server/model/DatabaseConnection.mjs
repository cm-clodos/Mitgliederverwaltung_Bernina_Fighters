import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

class DatabaseConnection {
    constructor(databaseType = process.env.DB_TYPE || 'production') {
        this.host = process.env.DB_HOST;
        this.port = process.env.DB_PORT;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.database = process.env.DB_DATABASE;
        this.databaseType = databaseType;
    }

    async connectToDatabase() {
        if (this.databaseType === 'test') {
            this.database = process.env.TEST_DB_DATABASE;
            this.host = process.env.TEST_DB_HOST;
            this.user = process.env.TEST_DB_USER;
            this.password = process.env.TEST_DB_PASSWORD;
            this.port = process.env.TEST_DB_PORT;
        } else if (this.databaseType !== 'production') {
            throw new Error(`Invalid database: ${this.databaseType}`);
        }

        try {
            const connection = await mariadb.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                database: this.database,
            });
            console.log(`Connected to ${this.databaseType} database!`);
            return connection;
        } catch (error) {
            console.error(`Error connecting to database: ${error}`);
        }
    }

    async query(sql, values) {
        let conn = await this.connectToDatabase();
        try {
            const result = await conn.query(sql, values);
            return {success: true, data: result};
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

}


export default DatabaseConnection;
