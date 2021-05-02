import { InvalidAvailabilityPeriodError } from '@/presentation/errors/invalid-availability-period-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { InvalidSlotError } from '@/presentation/errors/invalid-slot-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { Validation } from '@/presentation/interfaces'
import { mockFakeRequest } from '@/tests/presentation/mocks/mock-professional-slot'

type SutTypes = {
	sut: ValidationComposite
	validationStubs: Validation[]
}
const mockValidator = (): Validation => {
	class validationStubs implements Validation {
		async validate (input: any): Promise<Error | undefined> {
			return undefined
		}
	}
	return new validationStubs()
}

const makeSut = (): SutTypes => {
	const validationStubs = [mockValidator(),mockValidator(),mockValidator(),mockValidator()]
	const sut = new ValidationComposite(validationStubs)
	return {
		sut,
		validationStubs
	}
}

describe('Validation Composite', () => {
  test('Should return 400 if validation fails on a required field', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockResolvedValueOnce(new MissingParamError('any_field'))
    const mockedRequest = mockFakeRequest()
    const error = await sut.validate({
      ...mockedRequest.body,
      id: mockedRequest.params.id
    })
    
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return 400 if validation fails on invalid availability period', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate')
    .mockResolvedValueOnce(new InvalidAvailabilityPeriodError('2021-05-01T21:00:00.000Z', '2021-05-01T21:00:00.000Z'))
    const mockedRequest = mockFakeRequest()
    const error = await sut.validate({
      ...mockedRequest.body,
      id: mockedRequest.params.id
    })
    expect(error).toEqual(new InvalidAvailabilityPeriodError('2021-05-01T21:00:00.000Z', '2021-05-01T21:00:00.000Z'))
  })

  test('Should return 400 if validation fails on invalid param', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[2], 'validate')
    .mockResolvedValueOnce(new InvalidParamError('any_param'))
    const mockedRequest = mockFakeRequest()
    const error = await sut.validate({
      ...mockedRequest.body,
      id: mockedRequest.params.id
    })
    expect(error).toEqual(new InvalidParamError('any_param'))
  })

  test('Should return 400 if validation fails on invalid slot', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[3], 'validate')
    .mockResolvedValueOnce(new InvalidSlotError('2021-05-01T21:00:00.000Z', '2021-05-01T23:00:00.000Z'))
    const mockedRequest = mockFakeRequest()
    const error = await sut.validate({
      ...mockedRequest.body,
      id: mockedRequest.params.id
    })
    expect(error).toEqual(new InvalidSlotError('2021-05-01T21:00:00.000Z', '2021-05-01T23:00:00.000Z'))
  })

  test('Should not return if validation succeeds', async() => {
		const { sut } = makeSut()
		const mockedRequest = mockFakeRequest()
    const error = await sut.validate({
      ...mockedRequest.body,
      id: mockedRequest.params.id
    })
		expect(error).toBeFalsy()
	})
})
