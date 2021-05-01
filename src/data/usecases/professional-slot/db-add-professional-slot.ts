import { AddProfessionalSlotRepository } from '@/data/interfaces/professional-slot/add-professional-slot-repository'
import { AddProfessionalSlotParams } from '@/domain/usecases/professional-slot/add-professional-slot/add-professional-slot'

export class DbAddProfessionalSlot {
  constructor (private readonly addProfessionalSlotRepository: AddProfessionalSlotRepository) {}
  async add (data: AddProfessionalSlotParams): Promise<void> {
    await this.addProfessionalSlotRepository.add(data)
    return await Promise.resolve(undefined)
  }
}
