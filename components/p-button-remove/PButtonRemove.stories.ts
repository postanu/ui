import type { Story } from '@storybook/vue3'

import PButtonRemove from './PButtonRemove.vue'

export default {
	title: 'PButton/PButtonRemove',
	component: PButtonRemove,
	argTypes: {
		timeout: {
			control: 'number',
			description: 'Milliseconds before cancel removing.'
		},
		default: {
			control: 'text',
			description: 'Buttons text.'
		},
		question: {
			control: 'text',
			description: 'Confirmation question.'
		},
		agree: {
			control: 'text',
			description: 'Confirmation agree.'
		},
		disagree: {
			control: 'text',
			description: 'Confirmation disagree.'
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
}

const Template: Story = args => ({
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
Default.args = {
	default: 'Remove',
	question: 'Delete?',
	agree: 'Confirm',
	disagree: 'Cancel'
}
