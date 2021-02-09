import PBadge from './PBadge.vue'

export default {
	title: 'PBadge',
	component: PBadge,
	argTypes: {
		text: {
			description: 'Slot content',
			control: { type: 'text' },
			defaultValue: 'Badge'
		}
	}
}

export const Default = (args, { argTypes }) => ({
	components: { PBadge },
	props: Object.keys(argTypes),
	template: '<p-badge>{{ text }}</p-badge>'
})
