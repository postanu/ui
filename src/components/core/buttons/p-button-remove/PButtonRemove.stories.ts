import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

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
		}
	}
} as Meta<typeof PButtonRemove>

export const Default: Story = {
	render: args => ({
		components: { PButtonRemove },
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		setup: () => {
			return {
				args,
				removing: ref(args.removing)
			}
		},
		template: `
			<p-button-remove
				v-model:removing="args.removing"
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
		removing: false,
		onRemove: action('remove')
	}
}
