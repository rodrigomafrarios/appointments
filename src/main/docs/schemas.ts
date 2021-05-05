import {
	addProfessionalSlotSchema,
	loadProfessionalSlotsSchema,
	updateProfessionalSlotSchema,
	addBookingSchema,
	errorSchema
} from './schemas/index'

export default {
	error: errorSchema,
	addProfessionalSlot: addProfessionalSlotSchema,
	loadProfessionalSlots: loadProfessionalSlotsSchema,
	updateProfessionalSlot: updateProfessionalSlotSchema,
	addBooking: addBookingSchema
}
