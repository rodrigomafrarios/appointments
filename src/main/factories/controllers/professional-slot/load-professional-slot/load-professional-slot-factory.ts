import { makeDbLoadProfessionalSlot } from '@/main/factories/usecases/load-professional-slot/db-load-professional-slot-factory'
import { LoadProfessionalSlotController } from '@/presentation/controllers/professional-slot/load-professional-slot/load-professional-slot-controller'
import { Controller } from '@/presentation/interfaces'
import { makeLoadProfessionalSlotValidation } from './load-professional-slot-validation-factory'

export const makeLoadProfessionalSlotController = (): Controller => {
  const controller = new LoadProfessionalSlotController(makeLoadProfessionalSlotValidation(), makeDbLoadProfessionalSlot())
  return controller
}