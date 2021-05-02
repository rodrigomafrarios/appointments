import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/validators/professional-id-validation'
import { RequiredFieldValidation } from '@/presentation/validators/required-field-validation'
import { SlotValidation } from '@/presentation/validators/slot-validation'
import { ValidationComposite } from '@/presentation/validators/validation-composite'

export const makeAddProfessionalSlotValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	for (const field of ['start', 'end']) {
		validations.push(new RequiredFieldValidation(field))
	}

	validations.push(new ProfessionalIdValidation())
	validations.push(new SlotValidation())

	return new ValidationComposite(validations)
}