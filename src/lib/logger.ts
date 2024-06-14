import winston from 'winston';

export class CustomLogger {
  private colorizer = winston.format.colorize();

  private logger: winston.Logger = winston.createLogger();

  private logLabel: string = '';

  /**
   * @param logLabel the name of the class where this logger has been initialized
   * @example logger = new CustomLogger(FileClassName.name)
   */
  constructor(logLabel: string) {
    this.logLabel = logLabel;
    this.init();
  }

  init() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: this.logLabel }),
        winston.format.simple(),
        winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss.sss' }),
        winston.format.printf((msg) =>
          this.colorizer.colorize(
            msg.level,
            `${msg.timestamp} - ${msg.level === 'info' ? 'LOG' : msg.level.toUpperCase()}: [${
              msg.label
            }] ${msg.message}`
          )
        )
      ),
      transports: [new winston.transports.Console()],
    });
  }

  /**
   * @param message the main message to be highlighted in green color
   * @param context the additional context for the log (this won't be colorful)
   */
  log(message: string, context: string | any = undefined) {
    try {
      this.logger.info(message);
      if (context) console.log(context);
    } catch (error) {
      this.init();
      console.log(message, context);
    }
  }

  /**
   * @param message the main message to be highlighted in blue color
   * @param context the additional context for the log (this won't be colorful)
   */
  verbose(message: string, context: string | any = undefined) {
    try {
      this.logger.log('verbose', message);
      if (context) console.log(context);
    } catch (error) {
      this.init();
      console.log(message, context);
    }
  }

  /**
   * @param message the main message to be highlighted in purple color
   * @param context the additional context for the log (this won't be colorful)
   * @example this.logger.debug('this is a test debug message')
   */
  debug(message: string, context: string | any = undefined) {
    try {
      if (process.env.CONFIG_MIN_LOG_LEVEL === 'debug') {
        this.logger.debug(message);
        if (context) console.debug(context);
      }
    } catch (error) {
      this.init();
      console.debug(message, context);
    }
  }

  /**
   * @param error the main error object (message + stack)
   * @param message the error message (in red color)
   * @example this.logger.error(error, message?)
   */
  error(error, message: string | undefined = undefined) {
    try {
      if (typeof error === 'string') {
        this.logger.error(error);
      } else {
        this.logger.error((message ? `${message} ` : '') + error.message);
        if (error.stack) console.error(error.stack);
        else console.error(error);
      }
    } catch (err) {
      this.init();
      console.error(err, message);
    }
  }

  /**
   * @param message the main message to be highlighted in yellow color
   * @param context the additional context for the log (this won't be colorful)
   * @example this.logger.warn('oops, you did XYZ', error.stack)
   */
  warn(message: string, context: string | any = undefined) {
    try {
      this.logger.warn(message);
      if (context) console.warn(context);
    } catch (error) {
      this.init();
      console.warn(message, context);
    }
  }
}
