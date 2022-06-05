import { onMounted, ref } from 'vue'
import type { Story } from '@storybook/vue3'

import PInput from './PInput.vue'

export default {
	title: 'PInput',
	component: PInput,
	argTypes: {
		value: {
			control: 'text'
		},
		type: {
			control: 'text'
		},
		placeholder: {
			control: 'text'
		},
		modelValue: {
			control: null
		}
	}
}

const Template: Story = args => ({
	components: { PInput },
	setup: (): object => {
		let input = ref<HTMLInputElement | null>(null)
		let focused = false

		if (args.testAutoFocus) {
			onMounted(() => {
				if (!focused) {
					input.value?.focus()
					focused = true
				}
			})
		}

		return {
			args,
			input,
			type: args.type,
			placeholder: args.placeholder,
			value: args.value
		}
	},
	template: `
		<p-input
			ref='input'
			:type="args.type"
			:placeholder="args.placeholder"
			v-model:value="value"
		/>
	`
})

export const Default = Template.bind({})
Default.args = {
	placeholder: 'Default Input'
}

export const AutoFocus = Template.bind({})
AutoFocus.storyName = 'Default: Autofocus'
AutoFocus.args = {
	testAutoFocus: true,
	placeholder: 'Default Input'
}
