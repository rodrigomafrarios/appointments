import { HttpResponse } from '@/presentation/interfaces'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const created = (): HttpResponse => {
  return {
    statusCode: 201,
    body: null
  }
}
