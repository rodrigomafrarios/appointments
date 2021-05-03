export class AvailabilitySlotUnavailableError extends Error {
  constructor (start: string, end: string) {
    super(`This slot is not available: ${start} - ${end}`)
    this.name = 'AvailabilitySlotInUseError'
  }
}
