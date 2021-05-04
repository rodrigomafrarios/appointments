export const updateProfessionalSlotSchema = {
	type: 'object',
	properties: {
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
