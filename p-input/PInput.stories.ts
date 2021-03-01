/* eslint-disable vue/one-component-per-file */
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
		placeholder: {
			control: 'text',
			defaultValue: 'Default Input'
		}
	}
} as Meta

export const Default: Story = () => defineComponent({
	components: { PInput },
	data: () => ({ testValue: '' }),
	template: '<p-input placeholder="Default Input" v-model:value="testValue"/>'
})

export const Focus: Story = () => defineComponent({
	components: { PInput },
	setup () {
		let input = ref<HTMLInputElement | null>(null)

		onMounted(() => {
			input.value?.focus()
			setTimeout(() => {
				input.value?.blur()
			}, 2000)
		})

		return { input }
	},
	template: '<p-input ref="input" placeholder="Default Input"/>'
})
Focus.storyName = 'Default: Focus then Blur'
