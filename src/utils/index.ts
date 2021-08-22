export function unexpectedExc (error?: unknown): void {
  if (error === undefined) {
    return
  }
  alert('An error occurred, please try again.')
  throw error
}
