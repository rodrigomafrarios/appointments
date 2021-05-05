import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import MockDate from 'mockdate'
import { mockBooking, mockDeleteBookingRepository, mockLoadBookingRepository } from '@/tests/data/mocks/db-booking'
import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { mockDeleteProfessionalSlotRepository, mockLoadProfessionalSlotRepository, mockProfessionalSlot } from '@/tests/data/mocks/db-professional-slot'
import { DeleteProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/delete-professional-slot/delete-professional-slot-repository'
import { DbDeleteProfessionalSlot } from '@/data/usecases/professional-slot/delete-professional-slot/db-delete-professional-slot'
import { LoadProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/load-professional-slot/load-professional-slot-repository'

type SutTypes = {
  sut: DbDeleteProfessionalSlot
  deleteProfessionalSlotRepositoryStub: DeleteProfessionalSlotRepository
  loadProfessionalSlotRepositoryStub: LoadProfessionalSlotRepository
  loadBookingRepositoryStub: LoadBookingRepository
  deleteBookingRepositoryStub: DeleteBookingRepository
}

const makeSut = (): SutTypes => {
  const deleteProfessionalSlotRepositoryStub = mockDeleteProfessionalSlotRepository()
  const loadProfessionalSlotRepositoryStub = mockLoadProfessionalSlotRepository()
  const loadBookingRepositoryStub = mockLoadBookingRepository()
  const deleteBookingRepositoryStub = mockDeleteBookingRepository()
  const sut = new DbDeleteProfessionalSlot(deleteProfessionalSlotRepositoryStub, loadProfessionalSlotRepositoryStub,loadBookingRepositoryStub, deleteBookingRepositoryStub)
  return {
    sut,
    deleteProfessionalSlotRepositoryStub,
    loadProfessionalSlotRepositoryStub,
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

  test('Should call LoadProfessionalSlotRepository with correct values', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    const loadProfessionalSlotSpy = jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    await sut.delete(mockProfessionalSlot())
    expect(loadProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot().id)
  })

  test('Should throw if LoadProfessionalSlotRepository throws', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadBookingRepository with correct values', async () => {
    const { sut, loadBookingRepositoryStub, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    const loadBookingSpy = jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    await sut.delete(mockProfessionalSlot())
    expect(loadBookingSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should throw if LoadBookingRepository throws', async () => {
    const { sut, loadBookingRepositoryStub, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteBookingRepository with correct values', async () => {
    const { sut, loadProfessionalSlotRepositoryStub, deleteBookingRepositoryStub, loadBookingRepositoryStub } = makeSut()
    
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    
    jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockBooking())
    
    const deleteBookingSpy = jest.spyOn(deleteBookingRepositoryStub, 'delete')
    const { id, professionalId} = mockProfessionalSlot()
    await sut.delete({
      id,
      professionalId
    })
    expect(deleteBookingSpy).toHaveBeenCalledWith(mockBooking())
  })

  test('Should throw if DeleteBookingRepository throws', async () => {
    const { sut, loadProfessionalSlotRepositoryStub, loadBookingRepositoryStub, deleteBookingRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    jest
    .spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockBooking())
    jest.spyOn(deleteBookingRepositoryStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })
})
