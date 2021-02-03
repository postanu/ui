import PLogo from './PLogo.vue'

export default {
	title: 'Logo',
	component: PLogo
}

export const Logo = () => ({
	components: { PLogo },
	template: '<p-logo></p-logo>'
})
