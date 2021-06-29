import { defineComponent, onMounted, ref } from 'vue'
import { Story, Meta } from '@storybook/vue3'

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
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PInput },
	setup: () => {
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
			maxlength: args.maxlength,
			autocorrect: args.autocorrect,
			autocapitalize: args.autocapitalize,
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
