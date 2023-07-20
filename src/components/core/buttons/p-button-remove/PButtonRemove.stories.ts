import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'

import PButtonRemove from './PButtonRemove.vue'

type Story = StoryObj<typeof PButtonRemove>

export default {
	title: 'Buttons / PButtonRemove',
	component: PButtonRemove,
	argTypes: {
		default: {
			control: 'text'
		},
		question: {
			control: 'text'
		},
		agree: {
			control: 'text'
		},
		disagree: {
			control: 'text'
		},
		timeout: {
			control: 'number',
			description: 'Milliseconds before cancel removing.'
		}
	}
} as Meta<typeof PButtonRemove>

export const Default: Story = {
	render: args => ({
		components: { PButtonRemove },
		setup: () => ({ args }),
		template: `
			<p-button-remove
				:timeout="args.timeout"
				@removing="args.onRemoving"
				@remove="args.onRemove"
			>
				<template v-slot:default>{{ args.default }}</template>
				<template v-slot:question>{{ args.question }}</template>
				<template v-slot:disagree>{{ args.disagree }}</template>
				<template v-slot:agree>{{ args.agree }}</template>
			</p-button-remove>
		`
	}),
	args: {
		default: 'Remove',
		question: 'Delete?',
		agree: 'Confirm',
		disagree: 'Cancel',
		onRemoving: action('removing'),
		onRemove: action('remove')
	}
}
