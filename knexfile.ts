import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5432"),
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    test: {
        client: "postgresql",
        connection: {
            database: process.env.TEST__DB_NAME,
            user: process.env.TEST__DB_USERNAME,
            password: process.env.TEST__DB_PASSWORD,
            host: process.env.TEST__DB_HOSTNAME,
            port: parseInt(process.env.TEST__DB_PORT || "5432"),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5432"),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }

};

module.exports = config;
