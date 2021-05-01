import { HttpResponse } from '@/presentation/interfaces'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
