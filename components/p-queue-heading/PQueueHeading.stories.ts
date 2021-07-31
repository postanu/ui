import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PQueueHeading from './PQueueHeading.vue'

export default {
	title: 'PQueue/PQueueHeading',
	component: PQueueHeading,
	argTypes: {
		date: {
			control: 'date'
		}
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PQueueHeading },
	setup: () => ({ args }),
	template: '<p-queue-heading :date="args.date" :muted="args.muted" />'
})

Default.args = {
	date: Date.now()
}
