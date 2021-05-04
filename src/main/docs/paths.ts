import {
	addProfessionalSlotPath,
	loadProfessionalSlotsPath,
	updateProfessionalSlotPath,
	deleteProfessionalSlotPath,
	addBookingPath
} from './paths/index'

export default {
	'/professional/{id}/availability-slot': addProfessionalSlotPath,
	'/professional/{id}/availability-slots': loadProfessionalSlotsPath,
	'/professional/{id}/availability-slot/{availabilitySlotId} ': updateProfessionalSlotPath,
	'/professional/{id}/availability-slot/{availabilitySlotId}' : deleteProfessionalSlotPath,
	'/booking': addBookingPath
}
