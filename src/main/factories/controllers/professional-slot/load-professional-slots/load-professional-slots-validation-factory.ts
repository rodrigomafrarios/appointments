import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

export const makeLoadProfessionalSlotsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	validations.push(new ProfessionalIdValidation())
	return new ValidationComposite(validations)
}