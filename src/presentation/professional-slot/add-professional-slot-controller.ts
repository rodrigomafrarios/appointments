import { HttpRequest } from '@/presentation/interfaces/http'

export class AddProfessionalSlotController {
  async handle (httpRequest: HttpRequest): Promise<any> {
    return {
      statusCode: 400,
      body: new Error('Missing param')
    }
  }
}
