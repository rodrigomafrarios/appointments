import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { DbAddBooking } from '@/data/usecases/booking/add-booking/db-add-booking'
import { mockAddBookingParams, mockBooking } from '@/tests/data/mocks/db-booking'
import { LoadProfessionalSlot, LoadProfessionalSlotAvailableRepository } from '@/data/interfaces/db/professional-slot/load-professional-slots/load-professional-slots-available-repository'
import { ProfessionalSlot } from '@/domain/models/professional-slot'
import { mockProfessionalSlot } from '../../mocks/db-professional-slot'

type SutTypes = {
  sut: DbAddBooking
  addBookingRepositoryStub: AddBookingRepository
  loadProfessionalSlotAvailableRepositoryStub: LoadProfessionalSlotAvailableRepository
}

const makeAddBookingRepository = (): AddBookingRepository => {
  class AddBookingRepositoryStub implements AddBookingRepository {
    add (params: AddBookingParams): Promise<Booking> {
      return Promise.resolve(mockBooking())
    }
  }
  return new AddBookingRepositoryStub()
}

const makeLoadProfessionalSlotAvailableRepository = (): LoadProfessionalSlotAvailableRepository => {
  class LoadProfessionalSlotAvailableRepositoryStub implements LoadProfessionalSlotAvailableRepository {
    async loadProfessionalSlotAvailable (params: LoadProfessionalSlot): Promise<ProfessionalSlot> {
      return Promise.resolve(null)
    }
  }
  return new LoadProfessionalSlotAvailableRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addBookingRepositoryStub = makeAddBookingRepository()
  const loadProfessionalSlotAvailableRepositoryStub = makeLoadProfessionalSlotAvailableRepository()
  const sut = new DbAddBooking(addBookingRepositoryStub, loadProfessionalSlotAvailableRepositoryStub)
  return {
    sut,
    addBookingRepositoryStub,
    loadProfessionalSlotAvailableRepositoryStub
  }
}

describe('AddBook Usecase', () => {
  test('Should call loadProfessionalSlotsAvailableRepository with correct values', async () => {
    const { sut, loadProfessionalSlotAvailableRepositoryStub } = makeSut()
    const loadProfessionalSlotAvailableRepositorySpy = jest.spyOn(loadProfessionalSlotAvailableRepositoryStub, 'loadProfessionalSlotAvailable')
    await sut.add(mockAddBookingParams())
    expect(loadProfessionalSlotAvailableRepositorySpy).toHaveBeenCalledWith({
      ...mockAddBookingParams(),
      isAvailable: true
    })
  })

  test('Should call AddBookRepository only when theres no professionalSlot available', async () => {
    const { sut, addBookingRepositoryStub, loadProfessionalSlotAvailableRepositoryStub } = makeSut()
    jest
    .spyOn(loadProfessionalSlotAvailableRepositoryStub, 'loadProfessionalSlotAvailable')
    .mockResolvedValueOnce(null)
    const addBookRepositorySpy = jest.spyOn(addBookingRepositoryStub, 'add')
    await sut.add(mockAddBookingParams())
    expect(addBookRepositorySpy).toHaveBeenCalledWith(mockAddBookingParams())
  })

  test('Should not call AddBookRepository', async () => {
    const { sut, loadProfessionalSlotAvailableRepositoryStub } = makeSut()
    jest
    .spyOn(loadProfessionalSlotAvailableRepositoryStub, 'loadProfessionalSlotAvailable')
    .mockResolvedValueOnce(mockProfessionalSlot())
    await sut.add(mockAddBookingParams())
  })

  test('Should throw if loadProfessionalSlotAvailableRepositoryStub throws', async () => {
    const { sut, loadProfessionalSlotAvailableRepositoryStub } = makeSut()
    jest.spyOn(loadProfessionalSlotAvailableRepositoryStub, 'loadProfessionalSlotAvailable').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if AddBookRepository throws', async () => {
    const { sut, addBookingRepositoryStub } = makeSut()
    jest.spyOn(addBookingRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })
})
