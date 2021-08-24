export function unexpectedExc (error?: unknown): void {
  if (error === undefined) {
    return
  }
  alert('An error occurred, please try again.')
  throw error
}

export function cloneDeep (object: unknown): unknown {
  /**
   * Deep clone an object
   * IMPORTANT: only works with JSON-serializable objects!!!
   */
  return JSON.parse(JSON.stringify(object))
}
