import { AddProfessionalSlotController } from '@/presentation/professional-slot/add-professional-slot-controller'

describe('AddProfessionalSlotController', () => {
  test('Should return 400 if no professionalId provided', async () => {
    const controller = new AddProfessionalSlotController()
    const httpRequest = {
      body: {
        start: new Date().toISOString(),
        end: new Date().toISOString()
      }
    }

    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
