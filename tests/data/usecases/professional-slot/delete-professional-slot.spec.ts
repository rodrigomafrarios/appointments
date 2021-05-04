import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import MockDate from 'mockdate'
import { mockBooking, mockDeleteBookingRepository, mockLoadBookingRepository } from '@/tests/data/mocks/db-booking'
import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { mockDeleteProfessionalSlotRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'
import { DbDeleteProfessionalSlot } from '@/data/usecases/professional-slot/delete-professional-slot/db-delete-professional-slot'

type SutTypes = {
  sut: DbDeleteProfessionalSlot
  deleteProfessionalSlotRepositoryStub: DeleteProfessionalSlotRepository
  loadBookingRepositoryStub: LoadBookingRepository
  deleteBookingRepositoryStub: DeleteBookingRepository
}

const makeSut = (): SutTypes => {
  const deleteProfessionalSlotRepositoryStub = mockDeleteProfessionalSlotRepository()
  const loadBookingRepositoryStub = mockLoadBookingRepository()
  const deleteBookingRepositoryStub = mockDeleteBookingRepository()
  const sut = new DbDeleteProfessionalSlot(deleteProfessionalSlotRepositoryStub, loadBookingRepositoryStub, deleteBookingRepositoryStub)
  return {
    sut,
    deleteProfessionalSlotRepositoryStub,
    loadBookingRepositoryStub,
    deleteBookingRepositoryStub
  }
}

describe('DeleteProfessionalSlot Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadBookingRepository with correct values', async () => {
    const { sut, loadBookingRepositoryStub } = makeSut()
    const loadBookingSpy = jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    await sut.delete(mockProfessionalSlot())
    expect(loadBookingSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should throw if LoadBookingRepository throws', async () => {
    const { sut, loadBookingRepositoryStub } = makeSut()
    jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteBookingRepository with correct values', async () => {
    const { sut, deleteBookingRepositoryStub, loadBookingRepositoryStub } = makeSut()
    jest
    .spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockBooking())
    const deleteBookingSpy = jest.spyOn(deleteBookingRepositoryStub, 'delete')
    await sut.delete(mockProfessionalSlot())
    expect(deleteBookingSpy).toHaveBeenCalledWith(mockBooking())
  })

  test('Should throw if DeleteBookingRepository throws', async () => {
    const { sut, loadBookingRepositoryStub, deleteBookingRepositoryStub } = makeSut()
    jest
    .spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockBooking())
    jest.spyOn(deleteBookingRepositoryStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteProfessionalSlotRepository with correct values', async () => {
    const { sut, deleteProfessionalSlotRepositoryStub } = makeSut()
    const deleteProfessionalSlotSpy = jest.spyOn(deleteProfessionalSlotRepositoryStub, 'delete')
    await sut.delete(mockProfessionalSlot())
    expect(deleteProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should throw if DeleteProfessionalSlotRepository throws', async () => {
    const { sut, deleteProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(deleteProfessionalSlotRepositoryStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })
})
