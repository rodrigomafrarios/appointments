export const updateProfessionalSlotPath = {
	put: {
		tags: ['Slots de disponibilidade'],
		summary: 'API para atualizar um slot de disponibilidade do profissional',
		parameters: [{
			in: 'path',
			name: 'id',
			required: true,
			description: 'ID do profissional'
		},
		{
			in: 'path',
			name: 'availabilitySlotId',
			required: true,
			description: 'ID do slot de disponibilidade do profissional'
		}],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/schemas/updateProfessionalSlot'
					}
				}
			}
		},
		responses: {
			200: {
				$ref: '#/components/ok'
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
