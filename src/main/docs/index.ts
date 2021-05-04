import paths from './paths'
import schemas from './schemas'
import components from './components'

export default {
	openapi: '3.0.0',
	info: {
		title: 'Appointments APIs',
		description: 'Exemplo de CRUD para slots de disponibilidade e criar agendamento de sessão',
		version: '1.0.0'
	},
	servers: [{
		url: '/api'
	}],
	tags: [
		{
			name: 'Slots de disponibilidade'
		},
		{
			name: 'Booking'
		}
	],
	paths,
	components,
	schemas
}
