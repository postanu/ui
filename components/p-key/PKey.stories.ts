import type { Story } from '@storybook/vue3'

import PKey from './PKey.vue'

export default {
	title: 'PKey',
	component: PKey,
	argTypes: {
		default: {
			control: 'text'
		}
	}
}

export const Default: Story = args => ({
	components: { PKey },
	setup: () => ({ args }),
	template: '<p-key>{{ args.default }}</p-key>'
})
Default.args = {
	default: 'Enter'
}
