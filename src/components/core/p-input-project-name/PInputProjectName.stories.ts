import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

import PInputProjectName from './PInputProjectName.vue'

type Story = StoryObj<typeof PInputProjectName>

export default {
	title: 'PInputProjectName',
	component: PInputProjectName,
	argTypes: {
		placeholder: {
			control: 'text'
		}
	}
} as Meta<typeof PInputProjectName>

export const Default: Story = {
	render: args => ({
		components: { PInputProjectName },
		setup: () => ({
			args,
			model: ref(args.modelValue)
		}),
		template: `
			<p-input-project-name
				v-model="model"
				@enter="args.onEnter"
				:placeholder="args.placeholder"
			/>
		`
	}),
	args: {
		placeholder: 'Stockholm',
		modelValue: '',
		onEnter: action('enter')
	}
}
