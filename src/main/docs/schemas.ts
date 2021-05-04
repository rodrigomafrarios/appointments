import {
	addProfessionalSlotSchema,
	loadProfessionalSlotsSchema,
	updateProfessionalSlotSchema,
	deleteProfessionalSlotSchema,
	errorSchema
} from './schemas/index'

export default {
	error: errorSchema,
	addProfessionalSlot: addProfessionalSlotSchema,
	loadProfessionalSlots: loadProfessionalSlotsSchema,
	updateProfessionalSlot: updateProfessionalSlotSchema,
	deleteProfessionalSlot: deleteProfessionalSlotSchema
}
