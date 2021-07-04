import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PClock from './PClock.vue'

export default {
	title: 'PClock',
	component: PClock,
	argTypes: {
		format: {
			control: 'select',
			options: ['12', '24']
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PClock },
	setup: () => ({ args }),
	template: '<p-clock :format="args.format" />'
})

export const One = Template.bind({})
One.storyName = '12-hour'
One.args = { format: '12' }

export const Two = Template.bind({})
Two.storyName = '24-hour'
Two.args = { format: '24' }
