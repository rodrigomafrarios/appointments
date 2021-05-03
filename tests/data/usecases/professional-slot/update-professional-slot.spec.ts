import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { DbUpdateProfessionalSlot } from '@/data/usecases/professional-slot/update-professional-slot/db-update-professional-slot'
import { mockProfessionalSlot, mockUpdateProfessionalSlotRepository } from '@/tests/data/mocks/db-professional-slot'
import MockDate from 'mockdate'
import { mockLoadBookingRepository } from '@/tests/data/mocks/db-booking'

type SutTypes = {
  sut: DbUpdateProfessionalSlot
  updateProfessionalSlotRepositoryStub: UpdateProfessionalSlotRepository
  loadBookingRepositoryStub: LoadBookingRepository
}

const makeSut = (): SutTypes => {
  const updateProfessionalSlotRepositoryStub = mockUpdateProfessionalSlotRepository()
  const loadBookingRepositoryStub = mockLoadBookingRepository()
  const sut = new DbUpdateProfessionalSlot(updateProfessionalSlotRepositoryStub, loadBookingRepositoryStub)
  return {
    sut,
    updateProfessionalSlotRepositoryStub,
    loadBookingRepositoryStub
  }
}

describe('UpdateProfessionalSlot Usecase', async () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call UpdateProfessionalSlotRepository with correct values', async () => {
    const { sut, updateProfessionalSlotRepositoryStub } = makeSut()
    const updateProfessionalSlotSpy = jest.spyOn(updateProfessionalSlotRepositoryStub, 'update')
    await sut.update(mockProfessionalSlot())
    expect(updateProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should call LoadBookingRepository with correct values', async () => {
    const { sut, loadBookingRepositoryStub } = makeSut()
    const loadBookingSpy = jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    await sut.update(mockProfessionalSlot())
    expect(loadBookingSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should throw if UpdateProfessionalSlotRepository throws', async () => {
    const { sut, updateProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(updateProfessionalSlotRepositoryStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.update(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })
})
