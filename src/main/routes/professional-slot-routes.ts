import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddProfessionalSlotController } from '@/main/factories/controllers/add-professional-slot/add-professional-slot-factory'

export default (router: Router): void => {
	router.post('/professional/:id/availability-slot', adaptRoute(makeAddProfessionalSlotController()))
}
