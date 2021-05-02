import { HttpRequest, Validation } from '@/presentation/interfaces'

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
      professionalId: 'any-professional-id',
      start: new Date().toISOString(),
      end: new Date().toISOString()
    },
    params: '123'
  }
}
