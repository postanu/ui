import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonCommon from './PButtonCommon.vue'

export default {
	title: 'Buttons / PButtonCommon',
	component: PButtonCommon,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonCommon>

const Template: StoryFn<typeof PButtonCommon> = args => ({
	components: { PButtonCommon },
	setup: () => ({
		args
	}),
	template: `
		<p-button-common>
			{{ args.default }}
		</p-button-common>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Button Common' }
