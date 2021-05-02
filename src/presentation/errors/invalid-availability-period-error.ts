export class InvalidAvailabilityPeriodError extends Error {
  constructor (start: string, end: string) {
    super(`Invalid Availability Period: ${start} | ${end}. Only 0 and 30 allowed`)
    this.name = 'InvalidAvailabilityPeriodError'
  }
}