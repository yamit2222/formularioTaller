"use strict";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envFilePath = path.resolve(_dirname, ".env");

dotenv.config({ path: envFilePath });

// Server Configuration
export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'localhost';
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Database Configuration for MySQL
export const DB_HOST = process.env.HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const PASSWORD = process.env.PASSWORD || '';
export const DATABASE = process.env.DATABASE || 'lubricentro';

// Security Configuration
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const cookieKey = process.env.cookieKey;