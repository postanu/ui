import { defineComponent } from 'vue'
import type { Story } from '@storybook/vue3'

import { generateAttachments, randomInRange } from '../../generator'
import PQueueItemAttachments from './PQueueItemAttachments.vue'

export default {
	title: 'Queue / PQueueItemAttachments',
	component: PQueueItemAttachments
}

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
