import { defineComponent, onMounted, ref } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PInput from './PInput.vue'

export default {
	title: 'PInput',
	component: PInput,
	argTypes: {
		value: {
			control: 'text',
			defaultValue: ''
		},
		type: {
			control: 'text',
			options: ['text'],
			defaultValue: 'text'
		},
		maxlength: {
			control: 'number',
			defaultValue: 25
		},
		autocorrect: {
			control: 'select',
			options: ['on', 'off'],
			defaultValue: 'on'
		},
		autocapitalize: {
			control: 'select',
			options: ['on', 'off'],
			defaultValue: 'on'
		},
		placeholder: {
			control: 'text',
			defaultValue: 'Default Input'
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
			:maxlength="args.maxlength"
			:autocorrect="args.autocorrect"
			:autocapitalize="args.autocapitalize"
			:placeholder="args.placeholder"
			v-model:value="value"
		/>
	`
})

export const Default = Template.bind({})

export const AutoFocus = Template.bind({})
AutoFocus.args = { testAutoFocus: true }
AutoFocus.storyName = 'Default: Autofocus'
