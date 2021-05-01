import { AddProfessionalSlotController } from '@/presentation/controllers/professional-slot/add-professional-slot-controller'
import { Controller } from '@/presentation/interfaces'
import { makeDbAddProfessionalSlot } from '@/main/factories/usecases/add-professional-slot/db-add-professional-slot-factory'
import { makeAddProfessionalSlotValidation } from './add-professional-slot-validation-factory'

export const makeAddProfessionalSlotController = (): Controller => {
  const controller = new AddProfessionalSlotController(makeAddProfessionalSlotValidation(), makeDbAddProfessionalSlot())
  return controller
}