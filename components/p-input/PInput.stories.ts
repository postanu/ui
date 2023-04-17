import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import PInput from './PInput.vue'

type Story = StoryObj<typeof PInput>

export default {
	title: 'PInput',
	component: PInput,
	argTypes: {
		placeholder: {
			control: 'text'
		}
	}
} as Meta<typeof PInput>

export const Default: Story = {
	render: args => ({
		components: { PInput },
		setup: () => ({
			args,
			modelValue: ref(args.modelValue)
		}),
		template: `
			<p-input
				:type="args.type"
				:placeholder="args.placeholder"
				v-model:value="modelValue"
			/>
		`
	}),
	args: {
		placeholder: 'Default Input',
		modelValue: ''
	}
}
