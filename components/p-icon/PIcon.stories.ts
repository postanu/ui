import type { StoryFn } from '@storybook/vue3'

import { icons } from '../../icons/index.js'
import PIcon from './PIcon.vue'

export default {
	title: 'PIcon',
	component: PIcon,
	argTypes: {
		icon: {
			control: 'select',
			options: Object.keys(icons)
		},
		title: {
			control: 'text'
		},
		scale: {
			control: 'number'
		}
	}
}

const Template: StoryFn = args => ({
	components: { PIcon },
	setup: () => ({ args }),
	template: '<p-icon v-bind="args"/>'
})

export const Postanu = Template.bind({})
Postanu.args = { icon: 'postanu', title: 'Postanu Icon' }

export const Facebook = Template.bind({})
Facebook.args = { icon: 'facebook', title: 'Facebook Icon' }

export const Twitter = Template.bind({})
Twitter.args = { icon: 'twitter', title: 'Twitter Icon' }

export const NoTitle = Template.bind({})
NoTitle.args = { icon: 'facebook' }

export const Decorative = Template.bind({})
Decorative.args = { icon: 'facebook', isDecorative: true }
