import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PAvatar from './PAvatar.vue'

export default {
	title: 'PAvatar',
	component: PAvatar,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL'
		},
		letter: {
			control: 'text',
			description: 'First letter of user’s name'
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
	image: 'mm.jpg',
	letter: 'M'
}

export const Letter = Template.bind({})
Letter.args = {
	letter: 'M'
}
