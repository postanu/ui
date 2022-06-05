import { ref } from 'vue'
import type { Story } from '@storybook/vue3'

import PRadioButton from './PRadioButton.vue'
import PRadioGroup from './PRadioGroup.vue'

export default {
	title: 'PRadio',
	component: PRadioButton,
	argTypes: {
		name: {
			control: 'text'
		},
		value: {
			control: 'text'
		},
		modelValue: {
			control: 'text'
		},
		default: {
			control: 'text'
		},
		onUpdate: {
			action: true
		}
	}
}

const Template: Story = args => ({
	components: { PRadioButton, PRadioGroup },
	setup: (): object => {
		return {
			name: args.name,
			value: args.value,
			content: args.default,
			modelValue: ref(args.modelValue || ''),
			onUpdate: args.onUpdate
		}
	},
	template: `
		<p-radio-group v-model="modelValue" @update:model-value="onUpdate">
			<p-radio-button :name="name" value="fehu">fehu</p-radio-button>
			<p-radio-button :name="name" :value="value">{{ content }}</p-radio-button>
			<p-radio-button :name="name" value="gebu">gebu</p-radio-button>
			<p-radio-button :name="name" value="oþila">oþila</p-radio-button>
		</p-radio-group>
	`
})

export const Default = Template.bind({})
Default.args = {
	default: 'euaaaio',
	value: 'euaaaio',
	name: 'group'
}

export const Preselected = Template.bind({})
Preselected.args = {
	modelValue: 'euaaaio',
	default: 'euaaaio',
	value: 'euaaaio',
	name: 'group'
}
