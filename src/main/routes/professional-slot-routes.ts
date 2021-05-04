import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddProfessionalSlotController } from '@/main/factories/controllers/add-professional-slot/add-professional-slot-factory'
import { makeLoadProfessionalSlotsController } from '@/main/factories/controllers/load-professional-slots/load-professional-slots-factory'
import { makeUpdateProfessionalSlotController } from '@/main/factories/controllers/update-professional-slot/update-professional-slot-controller-factory'
import { makeDeleteProfessionalSlotController } from '@/main/factories/controllers/delete-professiona-slot/delete-professional-slot-controller-factory'

export default (router: Router): void => {
	router.post('/professional/:id/availability-slot', adaptRoute(makeAddProfessionalSlotController()))
	router.get('/professional/:id/availability-slots', adaptRoute(makeLoadProfessionalSlotsController()))
	router.put('/professional/:id/availability-slot/:availabilitySlotId', adaptRoute(makeUpdateProfessionalSlotController()))
	router.delete('/professional/:id/availability-slot/:availabilitySlotId', adaptRoute(makeDeleteProfessionalSlotController()))
}
