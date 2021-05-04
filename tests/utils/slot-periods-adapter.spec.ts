import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { SlotsPeriodsAdapter } from '@/utils/slot-periods-adapter'

const makeSut = (): SlotsPeriodsAdapter => {
  return new SlotsPeriodsAdapter()
}

describe('Utils - SlotPeriodsAdapter', () => {
  test('Should return periods of slot', async () => {
    const sut = makeSut()
    const mockSlot = mockProfessionalSlot()
    
    let midDate = new Date(mockSlot.start)
    midDate.setMinutes(midDate.getMinutes() + 30)

    let endDate = new Date(mockSlot.end)
    endDate.setHours(new Date(mockSlot.end).getHours() + 1)
    
    const professionalSlot = Object.assign({}, mockSlot, {
      end: endDate.toISOString()
    })
    const professionalSlots:ProfessionalSlot[] = [professionalSlot]

    const results = await sut.toPeriod(professionalSlots)

    expect(results[0].start).toBe(mockSlot.start)
    expect(results[0].end).toBe(midDate.toISOString())

    expect(results[1].start).toBe(midDate.toISOString())
    expect(results[1].end).toBe(endDate.toISOString())
  })
})
