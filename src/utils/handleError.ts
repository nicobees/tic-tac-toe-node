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
