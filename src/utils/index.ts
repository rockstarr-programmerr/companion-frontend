export function unhandledExc (error?: unknown): void {
  if (error === undefined) {
    return
  }
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
  alert('An error occurred, please try again.')
}
