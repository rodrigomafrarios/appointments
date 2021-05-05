import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

export const makeDeleteProfessionalSlotValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	for (const field of ['professionalId', 'id']) {
		validations.push(new RequiredFieldValidation(field))
	}

	validations.push(new ProfessionalIdValidation())

	return new ValidationComposite(validations)
}