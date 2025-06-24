// @ts-ignore
import winston from "winston";

const levels = {
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5
}

const level = () => {
  const env = process.env['ENV'] || 'development'
  const isDevelopment = env === "development"
  return isDevelopment ? "debug" : "warn"
}
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white"
}

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true, colors }),
  winston.format.printf((info) => {
    return `${info.timestamp} - ${info.level} - ${info.message}`
  })
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error"
  }),
  new winston.transports.File({
    filename: 'logs/Routes-access.log',
    level: "http"
  }),
  new winston.transports.File({ filename: "logs/all.log" })
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports

})

export { Logger }