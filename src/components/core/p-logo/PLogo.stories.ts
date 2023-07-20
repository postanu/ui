import type { Meta, StoryObj } from '@storybook/vue3'

import PLogo from './PLogo.vue'

type Story = StoryObj<typeof PLogo>

export default {
	title: 'PLogo',
	component: PLogo
} as Meta<typeof PLogo>

export const Default: Story = {}
