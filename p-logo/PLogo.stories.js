import PLogo from './PLogo.vue'

export default {
	title: 'PLogo',
	component: PLogo
}

export const Default = () => ({
	components: { PLogo },
	template: '<p-logo/>'
})
