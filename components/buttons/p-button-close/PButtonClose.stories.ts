import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'

import PButtonClose from './PButtonClose.vue'

type Story = StoryObj<typeof PButtonClose>

export default {
	title: 'Buttons / PButtonClose',
	component: PButtonClose
} as Meta<typeof PButtonClose>

export const Default: Story = {
	render: args => ({
		components: { PButtonClose },
		setup: () => ({ args }),
		template: `
			<p-button-close @close="args.onClose" />
		`
	}),
	args: {
		onClose: action('close')
	}
}
