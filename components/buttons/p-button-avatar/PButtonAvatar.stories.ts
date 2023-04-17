import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonAvatar from './PButtonAvatar.vue'

type Story = StoryObj<typeof PButtonAvatar>

export default {
	title: 'Buttons / PButtonAvatar',
	component: PButtonAvatar
} as Meta<typeof PButtonAvatar>

export const Default: Story = {
	args: { image: 'mm.jpg' }
}
