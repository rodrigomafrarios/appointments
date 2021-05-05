import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { SlotValidation } from '@/presentation/helpers/validators/slot-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeLoadProfessionalSlotValidation } from '@/main/factories/controllers/professional-slot/load-professional-slot/load-professional-slot-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('LoadProfessionalSlotValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
		makeLoadProfessionalSlotValidation()
		const validations: Validation[] = []
    validations.push(new ProfessionalIdValidation())

		expect(ValidationComposite).toHaveBeenCalledWith(validations)
	})
})
