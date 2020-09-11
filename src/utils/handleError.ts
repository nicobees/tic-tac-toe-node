export const onServerError = (error: NodeJS.ErrnoException, port: string): void => {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(String(port) + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(String(port) + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor (message: Record<string, unknown> | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(message)
    }
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor (message: string | Record<string, unknown> = 'Bad Request') {
    super(message)
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor (message: string | Record<string, unknown> = 'Unauthorized') {
    super(message)
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor (message: string | Record<string, unknown> = 'Forbidden') {
    super(message)
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor (message: string | Record<string, unknown> = 'Not found') {
    super(message)
  }
}
