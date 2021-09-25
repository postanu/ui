import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { generateAttachments, randomInRange } from '../../generator'
import PQueueItemAttachments from './PQueueItemAttachments.vue'

export default {
	title: 'PQueue/PQueueItemAttachments',
	component: PQueueItemAttachments
} as Meta

const Template: Story = args => defineComponent({
	components: { PQueueItemAttachments },
	setup: () => ({ args }),
	template: '<p-queue-item-attachments :items="args.items" />'
})

export const One = Template.bind({})
One.args = {
	items: generateAttachments(1)
}

export const Four = Template.bind({})
Four.args = {
	items: generateAttachments(4)
}

export const More = Template.bind({})
More.args = {
	items: generateAttachments(randomInRange(5, 12))
}