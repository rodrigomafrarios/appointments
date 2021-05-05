import {
	addProfessionalSlotSchema,
	loadProfessionalSlotSchema,
	loadProfessionalSlotsSchema,
	updateProfessionalSlotSchema,
	addBookingSchema,
	errorSchema
} from './schemas/index'

export default {
	error: errorSchema,
	addProfessionalSlot: addProfessionalSlotSchema,
	loadProfessionalSlot: loadProfessionalSlotSchema,
	loadProfessionalSlots: loadProfessionalSlotsSchema,
	updateProfessionalSlot: updateProfessionalSlotSchema,
	addBooking: addBookingSchema
}
