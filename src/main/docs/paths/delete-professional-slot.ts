export const deleteProfessionalSlotPath = {
	delete: {
		tags: ['Slots de disponibilidade'],
		summary: 'API para deletar um slot de disponibilidade do profissional',
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
						$ref: '#/schemas/deleteProfessionalSlot'
					}
				}
			}
		},
		responses: {
			200: {},
			400: {
				$ref: '#/components/badRequest'
			},
			500: {
				$ref: '#/components/serverError'
			}
		}
	}
}
