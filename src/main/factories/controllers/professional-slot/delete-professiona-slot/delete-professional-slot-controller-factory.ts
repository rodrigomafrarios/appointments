import { DeleteProfessionalSlotController } from '@/presentation/controllers/professional-slot/delete-professional-slot/delete-professional-slot-controller'
import { Controller } from '@/presentation/interfaces'
import { makeDbDeleteProfessionalSlot } from '@/main/factories/usecases/delete-professional-slot/db-delete-professional-slot-factory'
import { makeDeleteProfessionalSlotValidation } from './delete-professional-slot-validation-factory'


export const makeDeleteProfessionalSlotController = (): Controller => {
  const controller = new DeleteProfessionalSlotController(makeDeleteProfessionalSlotValidation(), makeDbDeleteProfessionalSlot())
  return controller
}