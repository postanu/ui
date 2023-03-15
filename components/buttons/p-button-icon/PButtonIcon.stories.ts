import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonIcon from './PButtonIcon.vue'
import PIconFacebook from '../../icons/p-icon-facebook/PIconFacebook.vue'

export default {
	title: 'Buttons / PButtonIcon',
	component: PButtonIcon,
	argTypes: {
		default: {
			control: 'text'
		},
		href: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonIcon>

const Template: StoryFn<typeof PButtonIcon> = args => ({
	components: {
		PButtonIcon,
		PIconFacebook
	},
	setup: () => ({
		href: args.href
	}),
	template: `
		<p-button-icon :href="href">
			${args.default}
		</p-button-icon>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Button With Icon <p-icon-facebook />' }

export const Link = Template.bind({})
Link.args = {
	default: 'Button Link With Icon <p-icon-facebook />',
	href: '#'
}
