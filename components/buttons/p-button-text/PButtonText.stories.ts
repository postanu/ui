import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonText from './PButtonText.vue'

export default {
	title: 'Buttons / PButtonText',
	component: PButtonText,
	argTypes: {
		default: {
			control: 'text'
		},
		type: {
			control: 'select',
			options: ['danger', 'target', 'muted']
		}
	}
} as Meta<typeof PButtonText>

const Template: StoryFn<typeof PButtonText> = args => ({
	components: { PButtonText },
	setup: () => ({ args }),
	template: `
		<p-button-text :type="args.type">
			{{ args.default }}
		</p-button-text>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Text Button' }

export const Target = Template.bind({})
Target.args = {
	default: 'Target Text Button',
	type: 'target'
}

export const Danger = Template.bind({})
Danger.args = {
	default: 'Danger Text Button',
	type: 'danger'
}

export const Muted = Template.bind({})
Muted.args = {
	default: 'Muted Text Button',
	type: 'muted'
}
