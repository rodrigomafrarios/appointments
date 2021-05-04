export const addProfessionalSlotPath = {
	post: {
		tags: ['Slots de disponibilidade'],
		summary: 'API para adicionar um slot de disponibilidade para o profissional',
		parameters: [{
			in: 'path',
			name: 'id',
			required: true,
			description: 'ID do profissional'
		}],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/addProfessionalSlot'
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
