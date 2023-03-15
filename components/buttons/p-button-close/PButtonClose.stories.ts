import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonClose from './PButtonClose.vue'

export default {
	title: 'Buttons / PButtonClose',
	component: PButtonClose,
	argTypes: {
		close: {
			action: true
		}
	}
} as Meta<typeof PButtonClose>

const Template: StoryFn<typeof PButtonClose> = args => ({
	components: { PButtonClose },
	setup: () => ({ args }),
	template: `
		<p-button-close @close="args.close" />
	`
})

export const Default = Template.bind({})
