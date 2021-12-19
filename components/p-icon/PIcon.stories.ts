import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

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
		label: {
			control: 'text'
		},
		scale: {
			control: 'number'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PIcon },
	setup: () => ({
		icon: args.icon,
		label: args.label,
		scale: args.scale
	}),
	template: `
		<p-icon
			:icon="icon"
			:label="label"
			:scale="scale"
		/>
	`
})

export const Postanu = Template.bind({})
Postanu.args = { icon: 'postanu' }

export const Facebook = Template.bind({})
Facebook.args = { icon: 'facebook' }

export const Twitter = Template.bind({})
Twitter.args = { icon: 'twitter' }
