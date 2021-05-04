export const addBookingSchema = {
  type: 'object',
  properties: {
    customerName: {
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
    }
  }
}
  