import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from './icons.js'
import PIcon from './PIcon.vue'

export default {
	title: 'PIcon',
	component: PIcon,
	argTypes: {
		icon: {
			control: { type: 'select', options: Object.keys(icons) }
		},
		label: {
			control: 'text',
			defaultValue: 'Icon Label'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PIcon },
	setup: () => ({
		icon: args.icon,
		label: args.label,
		width: args.width,
		height: args.height
	}),
	template: `
		<p-icon
			:icon="icon"
			:label="label"
			:width="width"
			:height="height"
		/>
	`
})

export const Postanu = Template.bind({})
Postanu.args = { icon: 'postanu' }

export const Facebook = Template.bind({})
Facebook.args = { icon: 'facebook' }

export const Twitter = Template.bind({})
Twitter.args = { icon: 'twitter' }
