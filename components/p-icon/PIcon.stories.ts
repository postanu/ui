import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from './icons.js'
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
			control: 'text',
			defaultValue: 'Icon Label'
		},
		scale: {
			control: 'number',
			defaultValue: 1
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
