import { Validation } from '@/presentation/interfaces'
import { ProfessionalIdValidation } from '@/presentation/helpers/validators/professional-id-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeLoadProfessionalSlotsValidation } from '@/main/factories/controllers/professional-slot/load-professional-slots/load-professional-slots-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('LoadProfessionalSlotsValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
		makeLoadProfessionalSlotsValidation()
		const validations: Validation[] = []
    validations.push(new ProfessionalIdValidation())

		expect(ValidationComposite).toHaveBeenCalledWith(validations)
	})
})
