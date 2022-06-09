import winston from 'winston'
import ILogger from './ILogger'

export default class Logger implements ILogger {
  private logger: winston.Logger
  constructor() {
    this._configure()
  }

  private _configure(): void {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp({ format: 'HH:mm:ss:ms' }),
            winston.format.colorize(),
            winston.format.printf(
              (info: winston.Logform.TransformableInfo) =>
                `${String(info.timestamp)} ${info.level}: ${info.message}`
            )
            //  winston.format.simple(),
          )
        })
      ],
      exitOnError: false
    })

    if (process.env.NODE_ENV === 'dev') {
      this.logger.add(
        new winston.transports.File({
          level: 'info',
          filename: './logs/all-logs.log',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.errors({ stack: true }),
            winston.format.printf(
              (info: winston.Logform.TransformableInfo) =>
                `${String(info.timestamp)} ${info.level}: ${info.message}`
            )
            // winston.format.splat(),
            // winston.format.json()
          ),
          maxsize: 5242880, // 5MB
          maxFiles: 5
        }))
    }
    this.logger.info('logging started')
  }

  debug(message: any): void {
    this.logger.debug(message)
  }

  error(message: any): void {
    this.logger.error(message)
  }

  info(message: any): void {
    this.logger.info(message)
  }

  warn(message: any): void {
    this.logger.warn(message)
  }

  http(message: any): void {
    this.logger.http(message)
  }
}