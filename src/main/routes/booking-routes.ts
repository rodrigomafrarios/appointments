import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddBookingController } from '@/main/factories/controllers/booking/add-booking/add-booking-controller-factory'

export default (router: Router): void => {
	router.post('/booking', adaptRoute(makeAddBookingController()))
}
