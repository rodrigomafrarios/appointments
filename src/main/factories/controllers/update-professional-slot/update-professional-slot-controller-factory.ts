import { UpdateProfessionalSlotController } from '@/presentation/controllers/professional-slot/update-professional-slot/update-professional-slot-controller'
import { Controller } from '@/presentation/interfaces'
import { makeDbUpdateProfessionalSlot } from '@/main/factories/usecases/update-professional-slot/db-update-professional-slot-factory'
import { makeUpdateProfessionalSlotValidation } from './update-professional-slot-validation-factory'

export const makeUpdateProfessionalSlotController = (): Controller => {
  const controller = new UpdateProfessionalSlotController(makeUpdateProfessionalSlotValidation(), makeDbUpdateProfessionalSlot())
  return controller
}