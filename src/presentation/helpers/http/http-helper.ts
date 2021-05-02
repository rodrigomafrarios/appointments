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

export const noContent = (): HttpResponse => {
	return {
		statusCode: 204,
		body: null
	}
}

export const ok = (data: any): HttpResponse => {
	return {
		statusCode: 200,
		body: data
	}
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error
  }
}
