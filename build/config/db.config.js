"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mysql_1 = require("mysql");
class DataBase {
    constructor() {
        this.openConection();
    }
    openConection() {
        try {
            this.pool = (0, mysql_1.createPool)({
                connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '4'),
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
            console.debug('MySql Adapter Pool generated successfully');
        }
        catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            throw new Error('Failed to initialized pool');
        }
    }
    execute(query, params) {
        try {
            if (!this.pool)
                throw new Error('Pool was not created. Ensure pool is created when running the app.');
            return new Promise((resolve, reject) => {
                this.pool.query(query, params, (error, results) => {
                    if (error)
                        reject(error);
                    else
                        resolve(results);
                });
            });
        }
        catch (error) {
            console.error('[mysql.connector][execute][Error]: ', error);
            throw new Error('failed to execute MySQL query');
        }
    }
}
exports.DataBase = DataBase;
