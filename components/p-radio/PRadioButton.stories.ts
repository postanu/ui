import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import PRadioButton from './PRadioButton.vue'
import PRadioGroup from './PRadioGroup.vue'

type Story = StoryObj<typeof PRadioButton>

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
} as Meta<typeof PRadioButton>

const Template: Story = {
	render: args => ({
		components: {
			PRadioButton,
			PRadioGroup
		},
		setup: () => ({
			...args,
			content: args.default,
			modelValue: ref(args.modelValue || '')
		}),
		template: `
			<p-radio-group v-model="modelValue" @update:model-value="onUpdate">
				<p-radio-button :name="name" value="fehu">fehu</p-radio-button>
				<p-radio-button :name="name" :value="value">{{ content }}</p-radio-button>
				<p-radio-button :name="name" value="gebu">gebu</p-radio-button>
				<p-radio-button :name="name" value="oþila">oþila</p-radio-button>
			</p-radio-group>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		name: 'group',
		value: 'euaaaio',
		default: 'euaaaio'
	}
}

export const Preselected: Story = {
	...Template,
	args: {
		name: 'group',
		value: 'euaaaio',
		default: 'euaaaio',
		modelValue: 'euaaaio'
	}
}
