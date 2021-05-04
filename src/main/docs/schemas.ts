import {
	addProfessionalSlotSchema,
	loadProfessionalSlotsSchema,
	updateProfessionalSlotSchema,
	deleteProfessionalSlotSchema,
	addBookingSchema,
	errorSchema
} from './schemas/index'

export default {
	error: errorSchema,
	addProfessionalSlot: addProfessionalSlotSchema,
	loadProfessionalSlots: loadProfessionalSlotsSchema,
	updateProfessionalSlot: updateProfessionalSlotSchema,
	deleteProfessionalSlot: deleteProfessionalSlotSchema,
	addBooking: addBookingSchema
}
