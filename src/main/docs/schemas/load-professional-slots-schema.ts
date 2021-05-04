export const loadProfessionalSlotsSchema = {
	type: 'object',
	properties: {
    id: {
      type: 'string'
    },
    professionalId: {
      type: 'string'
    },
		start: {
			type: 'string'
		},
		end: {
			type: 'string'
		},
    isAvailable: {
      type: 'boolean'
    }
	}
}
