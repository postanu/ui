import type { Meta, StoryObj } from '@storybook/vue3'

import PLinearCalendar from './PLinearCalendar.vue'

type Story = StoryObj<typeof PLinearCalendar>

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PLinearCalendar>

export const Default: Story = {
	args: {
		date: '13',
		day: 'Fri'
	}
}
