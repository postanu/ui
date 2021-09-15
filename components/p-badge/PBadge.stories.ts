import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PBadge from './PBadge.vue'

export default {
	title: 'PBadge',
	component: PBadge,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PBadge },
	setup: () => ({ args }),
	template: '<p-badge>{{ args.default }}</p-badge>'
})
Default.args = {
	default: 'Badge'
}
