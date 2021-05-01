import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation } from '@/presentation/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/validators/validation-composite'

export const makeAddProfessionalSlotValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	for (const field of ['start', 'end']) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}