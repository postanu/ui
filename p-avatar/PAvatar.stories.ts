import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PAvatar from './PAvatar.vue'

export default {
	title: 'PAvatar',
	component: PAvatar,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL',
			defaultValue: ''
		},
		letter: {
			control: 'text',
			description: 'First letter of user’s name',
			defaultValue: 'A'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PAvatar },
	setup: () => ({ args }),
	template: '<p-avatar v-bind="args" />'
})

export const Image = Template.bind({})
Image.args = {
	image: 'mm.jpg'
}

export const Letter = Template.bind({})
