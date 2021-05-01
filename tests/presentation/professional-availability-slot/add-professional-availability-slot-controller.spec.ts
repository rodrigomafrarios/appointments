import { AddProfessionalAvailabilitySlotController } from '@/presentation/professional-availability-slot/add-professional-availability-slot-controller'

describe('AddProfessionalAvailabilitySlotController', () => {
  test('Should return 400 if no professionalId provided', async () => {
    const controller = new AddProfessionalAvailabilitySlotController()
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
