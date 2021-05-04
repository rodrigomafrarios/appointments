export const addBookingPath = {
	post: {
		tags: ['Booking'],
		summary: 'API para o cliente criar um agendamento com o profissional',
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/addBooking'
					}
				}
			}
		},
		responses: {
			201: {
				$ref: '#/components/created'
			},
			400: {
				$ref: '#/components/badRequest'
			},
			500: {
				$ref: '#/components/serverError'
			}
		}
	}
}
