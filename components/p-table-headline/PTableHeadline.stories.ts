import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import { ALLOWED_TAGS } from '../p-heading/allowed-tags'
import PTableHeadline from './PTableHeadline.vue'

export default {
	title: 'PTable/PTableHeadline',
	component: PTableHeadline,
	argTypes: {
		default: {
			control: 'text'
		},
		tag: {
			control: 'select',
			options: ALLOWED_TAGS
		}
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PTableHeadline },
	setup: () => ({ args }),
	template: `
		<p-table-headline :tag="args.tag">{{ args.default }}</p-table-headline>
	`
})
Default.args = {
	default: 'System',
	tag: 'h3'
}
