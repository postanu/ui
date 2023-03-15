import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonAvatar from './PButtonAvatar.vue'

export default {
	title: 'Buttons / PButtonAvatar',
	component: PButtonAvatar
} as Meta<typeof PButtonAvatar>

const Template: StoryFn<typeof PButtonAvatar> = args => ({
	components: { PButtonAvatar },
	setup: () => ({
		image: args.image
	}),
	template: `
		<p-button-avatar :image="image" />
	`
})

export const Default = Template.bind({})
Default.args = { image: 'mm.jpg' }
