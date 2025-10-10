"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'Auth service' }), timestamp(), myFormat),
    transports: [
    // new DailyRotateFile({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'successes',
    //     'phu-%DATE%-success.log',
    //   ),
    //   datePattern: 'YYYY-DD-MM-HH',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    // }),
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'um error' }), timestamp(), myFormat),
    transports: [
    // new DailyRotateFile({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'errors',
    //     'phu-%DATE%-error.log',
    //   ),
    //   datePattern: 'YYYY-DD-MM-HH',
    //   zippedArchive: true,
    //   maxSize: '20m',
    //   maxFiles: '14d',
    // }),
    ],
});
exports.errorLogger = errorLogger;
