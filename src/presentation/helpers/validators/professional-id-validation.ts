import { Validation } from '@/presentation/interfaces'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class ProfessionalIdValidation implements Validation {
  async validate (params: any): Promise<Error | undefined> {
    const { professionalId } = params
    if (!ObjectId.isValid(professionalId)) {
      return new InvalidParamError('professionalId')
    }
  }
}
