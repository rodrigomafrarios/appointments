export const loadProfessionalSlotPath = {
	get: {
		tags: ['Slots de disponibilidade'],
		summary: 'API para obter um slot de disponibilidade do profissional',
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
			description: 'ID do slot de disponibilidade'
		}],
		responses: {
			200: {
				$ref: '#/components/ok'
			},
			204: {
				$ref: '#/components/noContent'
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