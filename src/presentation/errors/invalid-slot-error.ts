export class InvalidSlotError extends Error {
  constructor (start: string, end: string) {
    super(`Invalid slot: ${start} - ${end}`)
    this.name = 'InvalidSlotError'
  }
}
