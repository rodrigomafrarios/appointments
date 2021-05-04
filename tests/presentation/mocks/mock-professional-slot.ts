import { HttpRequest, HttpResponse, Validation } from '@/presentation/interfaces'

export const mockValidator = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error | undefined> {
      return undefined
    }
  }
  return new ValidationStub()
}

export const mockFakeRequest = (): HttpRequest => {
  return {
    body: {
      start: new Date().toISOString(),
      end: new Date().toISOString()
    },
    params: {
      id: '123',
      availabilitySlotId: '123'
    }
  }
}

export const mockFakeResponse = (): HttpResponse => {
  return {
    statusCode: 200,
    body: [{
        id: 'any-id',
        professionalId: 'any-professional-id',
        start: '2021-05-01T19:30:00.000Z',
        end: '2021-05-01T20:30:00.000Z',
        isAvailable: true
      }
    ]
  }
}
