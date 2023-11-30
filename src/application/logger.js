import winston from "winston";
import "winston-daily-rotate-file";

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "error-with-handling.log",
      dirname: "../../log/error",
      maxFiles: "14d",
      maxSize: "1m",
      handleExceptions: true,
      handleRejections: true,
    }),
    new winston.transports.DailyRotateFile({
      level: "warning",
      filename: "warning.log",
      dirname: "../../log/warning",
      maxFiles: "14d",
      maxSize: "1m",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "error-rotate-file.log",
      dirname: "../../log/error",
      maxFiles: "14d",
      maxSize: "1m",
    }),
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "info.log",
      dirname: "../../log/info",
      maxFiles: "14d",
      maxSize: "3m",
    }),
  ],
});
