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
