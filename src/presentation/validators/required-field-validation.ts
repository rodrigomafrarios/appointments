import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Validation } from '@/presentation/interfaces/validation'

export class RequiredFieldValidation implements Validation {
	private readonly fieldName: string
	constructor (fieldName: string) {
		this.fieldName = fieldName
	}

	async validate (input: any): Promise<Error | undefined> {
		if (!input[this.fieldName]) {
			return new MissingParamError(this.fieldName)
		}
	}
}
