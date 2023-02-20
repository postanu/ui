import { defineComponent } from 'vue'
import type { Story } from '@storybook/vue3'

import PQueueHeading from './PQueueHeading.vue'

export default {
	title: 'Queue / PQueueHeading',
	component: PQueueHeading,
	argTypes: {
		date: {
			control: 'date'
		}
	}
}

export const Default: Story = args => defineComponent({
	components: { PQueueHeading },
	setup: () => ({ args }),
	template: '<p-queue-heading :date="args.date" :muted="args.muted" />'
})

Default.args = {
	date: Date.now()
}