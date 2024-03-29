import { LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { UpdateProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/update-professional-slot/update-professional-slot-repository'
import { DbUpdateProfessionalSlot } from '@/data/usecases/professional-slot/update-professional-slot/db-update-professional-slot'
import { mockLoadProfessionalSlotRepository, mockProfessionalSlot, mockUpdateProfessionalSlotRepository } from '@/tests/data/mocks/db-professional-slot'
import MockDate from 'mockdate'
import { mockBooking, mockDeleteBookingRepository, mockLoadBookingRepository } from '@/tests/data/mocks/db-booking'
import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { LoadProfessionalSlotRepository } from '@/data/interfaces/db/professional-slot/load-professional-slot/load-professional-slot-repository'

type SutTypes = {
  sut: DbUpdateProfessionalSlot
  updateProfessionalSlotRepositoryStub: UpdateProfessionalSlotRepository
  loadProfessionalSlotRepositoryStub: LoadProfessionalSlotRepository
  loadBookingRepositoryStub: LoadBookingRepository
  deleteBookingRepositoryStub: DeleteBookingRepository
}

const makeSut = (): SutTypes => {
  const updateProfessionalSlotRepositoryStub = mockUpdateProfessionalSlotRepository()
  const loadBookingRepositoryStub = mockLoadBookingRepository()
  const deleteBookingRepositoryStub = mockDeleteBookingRepository()
  const loadProfessionalSlotRepositoryStub = mockLoadProfessionalSlotRepository()
  const sut = new DbUpdateProfessionalSlot(updateProfessionalSlotRepositoryStub, loadProfessionalSlotRepositoryStub, loadBookingRepositoryStub, deleteBookingRepositoryStub)
  return {
    sut,
    updateProfessionalSlotRepositoryStub,
    loadProfessionalSlotRepositoryStub,
    loadBookingRepositoryStub,
    deleteBookingRepositoryStub
  }
}

describe('UpdateProfessionalSlot Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadProfessionalSlotRepository with correct values', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    const loadProfessionalSlotSpy = jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    await sut.update(mockProfessionalSlot())
    expect(loadProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot().id)
  })

  test('Should throw if LoadProfessionalSlotRepository throws', async () => {
    const { sut, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.update(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadBookingRepository with correct values', async () => {
    const { sut, loadBookingRepositoryStub, loadProfessionalSlotRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotRepositoryStub, 'loadById')
    .mockResolvedValueOnce(mockProfessionalSlot())
    const loadBookingSpy = jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    await sut.update(mockProfessionalSlot())
    expect(loadBookingSpy).toHaveBeenCalledWith(mockProfessionalSlot())
  })

  test('Should throw if LoadBookingRepository throws', async () => {
    const { sut, loadBookingRepositoryStub } = makeSut()
    jest.spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.update(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteBookingRepository with correct values', async () => {
    const { sut, deleteBookingRepositoryStub, loadBookingRepositoryStub } = makeSut()
    jest
    .spyOn(loadBookingRepositoryStub, 'loadByProfessionalIdAndPeriod')
    .mockResolvedValueOnce(mockBooking())
    const deleteBookingSpy = jest.spyOn(deleteBookingRepositoryStub, 'delete')
    await sut.update(mockProfessionalSlot())
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

    const promise = sut.update(mockProfessionalSlot())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateProfessionalSlotRepository with correct values', async () => {
    const { sut, updateProfessionalSlotRepositoryStub } = makeSut()
    const updateProfessionalSlotSpy = jest.spyOn(updateProfessionalSlotRepositoryStub, 'update')
    await sut.update(mockProfessionalSlot())
    expect(updateProfessionalSlotSpy).toHaveBeenCalledWith(mockProfessionalSlot())
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
