import PLogo from './PLogo.vue'

export default {
	title: 'PLogo',
	component: PLogo
}

export const Logo = () => ({
	components: { PLogo },
	template: '<p-logo/>'
})
