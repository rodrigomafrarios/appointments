import { Validation } from '@/presentation/interfaces'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { InvalidSlotError } from '../errors/invalid-slot-error'
import { InvalidAvailabilityPeriodError } from '../errors/invalid-availability-period-error'

export class SlotValidation implements Validation {
  async validate (params: any): Promise<Error | undefined> {
    const { start, end } = params
    
    if (isNaN(new Date(start).getTime())) {
      return new InvalidParamError('start')
    }
    if (isNaN(new Date(end).getTime())) {
      return new InvalidParamError('end')
    }

    const startDate = new Date(start)
    const endDate   = new Date(end)

    const isAllowed = this.isPeriodAllowed(startDate, endDate)
    if (!isAllowed) {
      return new InvalidAvailabilityPeriodError(startDate.toISOString(), endDate.toISOString())
    }

    const isValid = this.isSlotValid(startDate, endDate)
    if (!isValid) {
      return new InvalidSlotError(startDate.toISOString(), endDate.toISOString())
    }
  }

  isPeriodAllowed (start: Date, end: Date): boolean {
    const isAllowed = (
      (start.getMinutes() === 0 || start.getMinutes() === 30) && 
      (end.getMinutes() === 0 || end.getMinutes() === 30)
      )
    return isAllowed
  }

  isSlotValid (start: Date, end: Date): boolean {
    const slotPeriod = (1 * 60 * 60 * 1000)
    const isValid = ((start.getTime() + slotPeriod) === end.getTime())
    return isValid
  }
}
