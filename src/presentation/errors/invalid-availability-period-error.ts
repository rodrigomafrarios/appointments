export class InvalidAvailabilityPeriodError extends Error {
  constructor (start: string, end: string) {
    super(`Invalid availability period: ${start} - ${end}`)
    this.name = 'InvalidAvailabilityPeriodError'
  }
}
