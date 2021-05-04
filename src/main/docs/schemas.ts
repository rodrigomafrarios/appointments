import { addProfessionalSlotSchema, loadProfessionalSlotsSchema, errorSchema } from './schemas/index'

export default {
	error: errorSchema,
	addProfessionalSlot: addProfessionalSlotSchema,
	loadProfessionalSlots: loadProfessionalSlotsSchema
}
