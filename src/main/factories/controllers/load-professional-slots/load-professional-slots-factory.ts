import { Controller } from '@/presentation/interfaces'
import { makeDbLoadProfessionalSlots } from '@/main/factories/usecases/load-professional-slots/db-load-professional-slots-factory'
import { makeLoadProfessionalSlotsValidation } from './load-professional-slots-validation-factory'
import { LoadProfessionalSlotsController } from '@/presentation/controllers/professional-slot/load-professional-slots/load-professional-slots-controller'

export const makeLoadProfessionalSlotsController = (): Controller => {
  const controller = new LoadProfessionalSlotsController(makeLoadProfessionalSlotsValidation(), makeDbLoadProfessionalSlots())
  return controller
}