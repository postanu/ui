import type { Story } from '@storybook/vue3'

import PBadge from './PBadge.vue'

export default {
	title: 'PBadge',
	component: PBadge,
	argTypes: {
		default: {
			control: 'text'
		}
	}
}

export const Default: Story = args => ({
	components: { PBadge },
	setup: () => ({ args }),
	template: '<p-badge>{{ args.default }}</p-badge>'
})
Default.args = {
	default: 'Badge'
}
