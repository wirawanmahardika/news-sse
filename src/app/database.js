import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

export const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: [
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
  ],
});

prisma.$on("error", (e) => {
  logger.error(e);
});
prisma.$on("warn", (e) => {
  logger.warn(e);
});
prisma.$on("query", (e) => {
  logger.info(e);
});
prisma.$on("info", (e) => {
  logger.info(e);
});