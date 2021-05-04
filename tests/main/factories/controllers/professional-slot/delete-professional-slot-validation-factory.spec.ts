import { makeAddProfessionalSlotValidation } from '@/main/factories/controllers/add-professional-slot/add-professional-slot-validation-factory'
import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { SlotValidation } from '@/presentation/helpers/validators/slot-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeDeleteProfessionalSlotValidation } from '@/main/factories/controllers/delete-professiona-slot/delete-professional-slot-validation-factory'
jest.mock('@/presentation/helpers/validators/validation-composite')

describe('DeleteProfessionalSlotValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
		makeDeleteProfessionalSlotValidation()
		const validations: Validation[] = []
    for (const field of ['start', 'end']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new ProfessionalIdValidation())
    validations.push(new SlotValidation())

		expect(ValidationComposite).toHaveBeenCalledWith(validations)
	})
})
