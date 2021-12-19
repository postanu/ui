import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import PAttachment from './PAttachment.vue'

export default {
	title: 'PAttachment',
	component: PAttachment,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PAttachment },
	setup: () => ({ args }),
	template: '<p-attachment :image="args.image" />'
})

export const Default = Template.bind({})
Default.args = {
	image: 'mm.jpg'
}
