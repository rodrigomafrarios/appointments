import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddProfessionalSlotController } from '@/main/factories/controllers/professional-slot/add-professional-slot/add-professional-slot-factory'
import { makeLoadProfessionalSlotsController } from '@/main/factories/controllers/professional-slot/load-professional-slots/load-professional-slots-factory'
import { makeUpdateProfessionalSlotController } from '@/main/factories/controllers/professional-slot/update-professional-slot/update-professional-slot-controller-factory'
import { makeDeleteProfessionalSlotController } from '@/main/factories/controllers/professional-slot/delete-professiona-slot/delete-professional-slot-controller-factory'
import { makeLoadProfessionalSlotController } from '@/main/factories/controllers/professional-slot/load-professional-slot/load-professional-slot-factory'

export default (router: Router): void => {
	router.post('/professional/:id/availability-slot', adaptRoute(makeAddProfessionalSlotController()))
	router.get('/professional/:id/availability-slot/:availabilitySlotId', adaptRoute(makeLoadProfessionalSlotController()))
	router.get('/professional/:id/availability-slots', adaptRoute(makeLoadProfessionalSlotsController()))
	router.put('/professional/:id/availability-slot/:availabilitySlotId', adaptRoute(makeUpdateProfessionalSlotController()))
	router.delete('/professional/:id/availability-slot/:availabilitySlotId', adaptRoute(makeDeleteProfessionalSlotController()))
}
