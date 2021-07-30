import { defineComponent, ref } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PRadioButton from './PRadioButton.vue'
import PRadioGroup from './PRadioGroup.vue'

export default {
	title: 'PRadioButton',
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
} as Meta

const Template: Story = args => defineComponent({
	components: { PRadioButton, PRadioGroup },
	setup: () => {
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
