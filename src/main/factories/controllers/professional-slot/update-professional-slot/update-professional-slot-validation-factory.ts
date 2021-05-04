import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { SlotValidation } from '@/presentation/helpers/validators/slot-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

export const makeUpdateProfessionalSlotValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	for (const field of ['start', 'end']) {
		validations.push(new RequiredFieldValidation(field))
	}

	validations.push(new ProfessionalIdValidation())
	validations.push(new SlotValidation())

	return new ValidationComposite(validations)
}