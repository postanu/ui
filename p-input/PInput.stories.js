import { onMounted, ref } from 'vue'

import PInput from './PInput.vue'

export default {
	title: 'PInput',
	component: PInput,
	argTypes: {
		value: {
			control: { type: 'text' },
			defaultValue: ''
		},
		placeholder: {
			control: { type: 'text' },
			defaultValue: 'Default Input'
		}
	}
}

export const Default = () => ({
	components: { PInput },
	template: '<p-input placeholder="Default Input"/>'
})

export const Focus = () => ({
	components: { PInput },
	template: '<p-input ref="input" placeholder="Default Input"/>',
	setup () {
		let input = ref(null)

		onMounted(() => {
			input.value.focus()
			setTimeout(() => {
				input.value.blur()
			}, 2000)
		})

		return { input }
	}
})
Focus.storyName = 'Default: Focus then Blur'
