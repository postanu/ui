import { ref } from 'vue'
import type { Story } from '@storybook/vue3'

import PInputProjectName from './PInputProjectName.vue'

export default {
	title: 'PInputProjectName',
	component: PInputProjectName,
	argTypes: {
		change: {
			action: true,
			description: 'Triggers on pressing `Enter` and passes the project name.'
		}
	}
}

export const Default: Story = args => ({
	components: { PInputProjectName },
	setup: () => ({
		args,
		model: ref('')
	}),
	template: '<p-input-project-name v-model="model" @change="args.change" />'
})
