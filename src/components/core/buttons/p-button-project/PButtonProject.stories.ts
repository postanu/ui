import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonProject from './PButtonProject.vue'

type Story = StoryObj<typeof PButtonProject>

export default {
	title: 'Buttons / PButtonProject',
	component: PButtonProject
} as Meta<typeof PButtonProject>

export const Default: Story = {}
