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
			control: null
		},
		default: {
			control: 'text'
		},
		change: {
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
			modelValue: ref(args.modelValue || undefined),
			onChange: args.change
		}
	},
	template: `
		<p-radio-group @change="onChange">
			<p-radio-button :name="name" value="fehu" v-model="modelValue">fehu</p-radio-button>
			<p-radio-button :name="name" :value="value" v-model="modelValue">{{ content }}</p-radio-button>
			<p-radio-button :name="name" value="gebu" v-model="modelValue">gebu</p-radio-button>
			<p-radio-button :name="name" value="oþila" v-model="modelValue">oþila</p-radio-button>
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
