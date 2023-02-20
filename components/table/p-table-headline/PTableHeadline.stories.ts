import type { Story } from '@storybook/vue3'

import { ALLOWED_TAGS } from '../../p-heading/allowed-tags.js'
import PTableHeadline from './PTableHeadline.vue'

export default {
	title: 'Table / PTableHeadline',
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
}

export const Default: Story = args => ({
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