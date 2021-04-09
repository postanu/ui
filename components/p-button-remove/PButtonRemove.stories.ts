import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PButtonRemove from './PButtonRemove.vue'

export default {
	title: 'Button/PButtonRemove',
	component: PButtonRemove,
	argTypes: {
		timeout: {
			control: 'number',
			description: 'Milliseconds before cancel removing.'
		},
		default: {
			control: 'text',
			description: 'Buttons text.',
			defaultValue: 'Remove'
		},
		question: {
			control: 'text',
			description: 'Confirmation quetion.',
			defaultValue: 'Delete?'
		},
		agree: {
			control: 'text',
			description: 'Confirmation agree.',
			defaultValue: 'Confirm'
		},
		disagree: {
			control: 'text',
			description: 'Confirmation disagree.',
			defaultValue: 'Cancel'
		},
		removing: {
			action: true,
			description: 'Triggers on showing the question for confirmation.'
		},
		remove: {
			action: true,
			description: 'Triggers on confirmation.'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButtonRemove },
	setup: () => ({ args }),
	template: `
		<p-button-remove
			@removing="args.removing"
			@remove="args.remove"
		>
			<template v-slot:default>{{ args.default }}</template>
			<template v-slot:question>{{ args.question }}</template>
			<template v-slot:disagree>{{ args.disagree }}</template>
			<template v-slot:agree>{{ args.agree }}</template>
		</p-button-remove>
	`
})

export const Default = Template.bind({})
Default.argTypes = {}
