import { LoadProfessionalSlotsRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-repository'
import { mockLoadProfessionalSlotsRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { DbLoadProfessionalSlots } from '@/data/usecases/professional-slot/load-professional-slots/db-load-professional-slots'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { SlotsPeriodsAdapter } from '@/utils/slot-periods-adapter'

type SutTypes = {
  sut: DbLoadProfessionalSlots
  loadProfessionalSlotsRepositoryStub: LoadProfessionalSlotsRepository
  slotPeriodsAdapterStub: SlotsPeriodsAdapter
}

const mockSlotPeriodsAdapter = (): SlotsPeriodsAdapter => {
  class SlotsPeriodsAdapterStub implements SlotsPeriodsAdapter {
    async toPeriod(professionalSlots: ProfessionalSlot[]): Promise<ProfessionalSlot[]> {
      let periods: ProfessionalSlot[] = []
    
      for(const slot of professionalSlots) {
        let periodMidDate = new Date(slot.start)
        periodMidDate.setMinutes(periodMidDate.getMinutes() + 30)
        
        periods.push({
          id: slot.id,
          professionalId: slot.professionalId,
          start: slot.start,
          end: periodMidDate.toISOString(),
          isAvailable: slot.isAvailable
        })
    
        periods.push({
          id: slot.id,
          professionalId: slot.professionalId,
          start: periodMidDate.toISOString(),
          end: slot.end,
          isAvailable: slot.isAvailable
        })
      }
      
      return periods
    }
  }
  return new SlotsPeriodsAdapterStub()
}

const makeSut = (): SutTypes => {
  const loadProfessionalSlotsRepositoryStub = mockLoadProfessionalSlotsRepository()
  const slotPeriodsAdapterStub = mockSlotPeriodsAdapter()
  const sut = new DbLoadProfessionalSlots(loadProfessionalSlotsRepositoryStub, slotPeriodsAdapterStub)
  return {
    sut,
    loadProfessionalSlotsRepositoryStub,
    slotPeriodsAdapterStub
  }
}

describe('LoadProfessionalSlots Usecase', () => {
  test('Should call LoadProfessionalSlotsRepository with correct value', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    const loadProfessionalSlotsSpy = jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId')
    await sut.loadByProfessionalId('any-id')
    expect(loadProfessionalSlotsSpy).toHaveBeenCalledWith('any-id')
  })

  test('Should throw if LoadProfessionalSlotsRepository throws', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.loadByProfessionalId('any-id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return availability periods of professional slots', async () => {
    const { sut, loadProfessionalSlotsRepositoryStub, slotPeriodsAdapterStub } = makeSut()
    const professionalSlots: ProfessionalSlot[] = []
    professionalSlots.push(mockProfessionalSlot())
    jest.spyOn(loadProfessionalSlotsRepositoryStub, 'loadByProfessionalId')
    .mockResolvedValueOnce(professionalSlots)
    const mockPeriods = await slotPeriodsAdapterStub.toPeriod(professionalSlots)
    const results = await sut.loadByProfessionalId('any-id')
    expect(results).toEqual(mockPeriods)
  })
})
