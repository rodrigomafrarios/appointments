import { AddProfessionalSlotController } from '@/presentation/professional-slot/add-professional-slot-controller'
import { Validation } from '@/presentation/interfaces/validation'
import { HttpRequest } from '@/presentation/interfaces'
import MockDate from 'mockdate'

interface SutTypes {
  sut: AddProfessionalSlotController
  validationStub: Validation
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString()
    }
  }
}

const makeValidator = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidator()
  const sut = new AddProfessionalSlotController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddProfessionalSlotController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 400 if no professionalId provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        start: new Date().toISOString(),
        end: new Date().toISOString()
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no start parameter provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        professionalId: 'any-professional-id',
        end: new Date().toISOString()
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param'))
  })

  test('Should return 400 if no end parameter provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        professionalId: 'any-professional-id',
        start: new Date().toISOString()
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param'))
  })
})
