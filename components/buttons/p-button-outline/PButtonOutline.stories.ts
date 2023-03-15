import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonOutline from './PButtonOutline.vue'

export default {
	title: 'Buttons / PButtonOutline',
	component: PButtonOutline,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonOutline>

const Template: StoryFn<typeof PButtonOutline> = args => ({
	components: { PButtonOutline },
	setup: () => ({
		args
	}),
	template: `
		<p-button-outline>
			{{ args.default }}
		</p-button-outline>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Button Outline' }
