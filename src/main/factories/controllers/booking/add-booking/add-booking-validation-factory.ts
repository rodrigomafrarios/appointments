import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { SlotValidation } from '@/presentation/helpers/validators/slot-validation'

export const makeAddBookingValidation = (): ValidationComposite => {
  const validations: Validation[] = []
	for (const field of ['start', 'end']) {
		validations.push(new RequiredFieldValidation(field))
	}
  
	validations.push(new ProfessionalIdValidation())
  validations.push(new SlotValidation())
  
	return new ValidationComposite(validations)
}