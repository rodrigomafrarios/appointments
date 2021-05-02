export class InvalidSlotError extends Error {
  constructor (start: string, end: string) {
    super(`Invalid Slot: ${start} | ${end}`)
    this.name = 'InvalidSlotError'
  }
}