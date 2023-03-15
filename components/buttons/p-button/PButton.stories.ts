import type { Meta, StoryFn } from '@storybook/vue3'

import PButton from './PButton.vue'

export default {
	title: 'Buttons / PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text'
		},
		disabled: {
			control: 'boolean'
		},
		href: {
			control: 'text'
		}
	}
} as Meta<typeof PButton>

const Template: StoryFn<typeof PButton> = args => ({
	components: { PButton },
	setup: () => ({
		args,
		href: args.href,
		disabled: args.disabled
	}),
	template: `
		<p-button
			:href="href"
			:disabled="disabled"
		>
			{{ args.default }}
		</p-button>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Default Button' }

export const Link = Template.bind({})
Link.args = {
	default: 'Button Link',
	href: '#',
	tag: 'a'
}
