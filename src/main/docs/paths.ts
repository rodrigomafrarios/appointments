import { addProfessionalSlotPath, loadProfessionalSlotsPath } from './paths/index'

export default {
	'/professional/:id/availability-slot': addProfessionalSlotPath,
	'/professional/:id/availability-slots': loadProfessionalSlotsPath
}
