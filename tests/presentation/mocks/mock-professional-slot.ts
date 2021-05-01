import { HttpRequest, Validation } from '@/presentation/interfaces'

export const mockValidator = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

export const mockFakeRequest = (): HttpRequest => {
  return {
    body: {
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString()
    }
  }
}
