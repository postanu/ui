import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PBadge from './PBadge.vue'

export default {
	title: 'PBadge',
	component: PBadge,
	argTypes: {
		default: {
			control: 'text',
			defaultValue: 'Badge',
			description: 'Slot content'
		}
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PBadge },
	setup: () => ({ args }),
	template: '<p-badge>{{ args.default }}</p-badge>'
})