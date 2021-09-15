import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PInputProjectName from './PInputProjectName.vue'

export default {
	title: 'PInputProjectName',
	component: PInputProjectName,
	argTypes: {
		create: {
			action: true,
			description: 'Triggers on pressing `Enter` and passes the project name.'
		}
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PInputProjectName },
	setup: () => ({ args }),
	template: '<p-input-project-name @create="args.create" />'
})
