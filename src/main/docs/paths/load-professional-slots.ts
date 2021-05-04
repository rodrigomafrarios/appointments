export const loadProfessionalSlotsPath = {
	get: {
		tags: ['Slots de disponibilidade'],
		summary: 'API para obter slots de disponibilidade separados por períodos do profissional',
		parameters: [{
			in: 'path',
			name: 'id',
			required: true,
			description: 'ID do profissional'
		}],
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
